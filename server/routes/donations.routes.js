import { Router } from "express";
import { 
    createOrderMP, 
    receiveWebhookMP, 
    createOrderPP, 
    captureOrderPP, 
    cancelOrderPP 
} from "../controllers/donation.js";

const router = Router();

//Mercado Pago
router.post('/create-order-mp', createOrderMP);

// router.get('/success', (req, res) => res.send('success'));
// router.get('/failure', (req, res) => res.send('failure'));
// router.get('/pending', (req, res) => res.send('pending'));

router.post('/webhook-mp', receiveWebhookMP);

//Paypal
router.post("/create-order-pp", createOrderPP);

router.get("/capture-order-pp", captureOrderPP);

router.get("/cancel-order-pp", cancelOrderPP);

export default router;