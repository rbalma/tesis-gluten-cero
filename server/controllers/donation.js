import mercadopago from "mercadopago";
import Donation from "../models/donation.js";
import axios from 'axios';
import { 
    MERCADOPAGO_ACCESS_TOKEN, 
    PAYPAL_API, PAYPAL_API_CLIENT, 
    PAYPAL_API_SECRET 
} from "../config/config.js";

//https://account.mongodb.com/account/login?n=%2Fv2&nextHash=%23org%2F60afd24f23992501a9b2b682%2Fprojects

//Mercado Pago
export const createOrderMP = async (req, res) => {
    
    mercadopago.configure({
        access_token: MERCADOPAGO_ACCESS_TOKEN,
    });

    //Dev
    const NGROK_URL = "https://e866-181-2-17-10.ngrok.io";
    // cd server
    // .\ngrok.exe http 5000

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: 'Donación GlutenCero',
                unit_price: Number(req.body.price),
                currency_id: "ARS",
                quantity: 1
            }
        ],
        back_urls: {
            success: "http://localhost:5173/aporte/success",
            failure: "http://localhost:5173/aporte",
            pending: "http://localhost:5000/pending"
        },
        notification_url:  `${NGROK_URL}/api/webhook`,
        payment_methods: {
            installments: 1,
            excluded_payment_methods: [{id: 'pagofacil'}, {id: 'rapipago'}]
        }
    });
    
    res.send(result.body);
};

export const receiveWebhookMP = async (req, res) => {
    console.log('webhook')
    const payment = req.query;

    try {
        if(payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment["data.id"]);
            console.log(data);

            //Guardo en bd
            const donation = new Donation({
                id: data.body.id,
                user: 'user1',
                payment_method: 'MercadoPago',
                amount: data.body.transaction_amount,
                date: new Date(data.body.date_approved)
            });

            const donationDB = await donation.save();

            res.json({
                ok: true,
                data: donationDB,
                message: 'Donacion creada',
            });
        } else {
            res.sendStatus(204);
        };
     
    } catch(error) {
        console.log(error)
        return res.sendStatus(500).json({error: error.message});
    };
};

//Paypal
export const createOrderPP = async (req, res) => {
  console.log('URL: ' + PAYPAL_API);
    try {
        const order = {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: Number(req.body.price),
              },
            },
          ],
          application_context: {
            brand_name: "GlutenCero",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `http://localhost:5000/api/capture-order-pp`,
            cancel_url: `http://localhost:5000/api/cancel-order-pp`,
          },
        };
    
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
    
        // Obtengo access token
        const {data: { access_token }} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        });
    
        console.log('TOKEN: ' + access_token);
    
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
    
        console.log(response.data);
    
        return res.json(response.data);
      } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server error");
      }
};

export const captureOrderPP = async (req, res) => {
    const { token } = req.query;

    try {
      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );
  
      console.log(response.data);

      //Guardo en bd
      const donation = new Donation({
        id: response.data.id,
        user: 'user1',
        payment_method: 'Paypal',
        amount: response.data.purchase_units[0].payments.captures[0].amount.value,
        date: new Date(response.data.purchase_units[0].payments.captures[0].create_time)
      });

      const donationDB = await donation.save();
      console.log(donationDB);
  
      res.redirect("http://localhost:5173/aporte/success");
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server error" });
    }
};

export const cancelOrderPP = async (req, res) => {
    res.redirect("http://localhost:5173/aporte")
};