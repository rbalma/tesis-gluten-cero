import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './Aportes.css';

import TerminosAportes from "./TerminosAportes";

export default function Aportes() {
  const status = useParams();
  const [paymentSuccess, setPaymentSuccess] = useState(status.status === 'success');
  const [showOptions, setShowOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(undefined);
  const [donacion, setDonacion] = useState(undefined);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const close = () => {
    setShowOptions(false);
    setDonacion(undefined);
    setPaymentMethod(undefined);
    setIsModalOpen(false);
  };

  const handleTermsAccept = () => {
    setIsTermsAccepted(true);
    setIsTermsModalVisible(false);
    setShowOptions(true); // Abre las opciones de pago después de aceptar los términos
    setIsModalOpen(true);
  };

  const handleTermsDecline = () => {
    setIsTermsAccepted(false);
    setIsTermsModalVisible(false);
  };

  const donateMP = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/create-order-mp', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: donacion }),
    });
    const data = await response.json();
    window.location.href = data.init_point;
  };

  const donatePP = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/create-order-pp', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: donacion }),
    });
    const data = await response.json();
    window.location.href = data.links[1].href;
  };

  return (
    <>
      {paymentSuccess &&
        <div className="modal-opciones-pago-container">
          <div className="modal-opciones-pago">
            <div className="modal-opciones-pago_header">
              <div className="modal-opciones-pago_header-title">¡Gracias por tu donación!</div>
              <div className="modal-opciones-pago_header-close" onClick={() => setPaymentSuccess(false)}>X</div>
            </div>
            <div style={{ 'gap': '.5rem' }} className="modal-opciones-pago_body">
              <p style={{ 'fontSize': '1rem' }}>Tu donación ha sido registrada con exito.</p>
              <button className="modal-opciones-pago_body-btn" onClick={() => setPaymentSuccess(false)}>Aceptar</button>
            </div>
          </div>
        </div>
      }
      {showOptions &&
        <div className="modal-opciones-pago-container">
          <div className="modal-opciones-pago">
            <div className="modal-opciones-pago_header">
              <div className="modal-opciones-pago_header-title">
                {paymentMethod === undefined ? 'Método de pago' : paymentMethod === 'mp' ? 'Mercado Pago' : 'Paypal'}
              </div>
              <div className="modal-opciones-pago_header-close" onClick={() => close()}>X</div>
            </div>
            {paymentMethod === undefined ?
              <div className="modal-opciones-pago_body">
                <button className="modal-opciones-pago_body-btn" onClick={() => setPaymentMethod('mp')}>MercadoPago</button>
                <button className="modal-opciones-pago_body-btn" onClick={() => setPaymentMethod('pp')}>Paypal</button>
              </div>
              :
              <form onSubmit={paymentMethod === 'mp' ? (event) => donateMP(event) : (event) => donatePP(event)}>
                <div className="modal-opciones-pago_body">
                  <div className="modal-opciones-pago_body-input-container">
                    <p>$</p>
                    <input
                      type="number"
                      onChange={e => setDonacion(e.target.value)}
                      value={donacion}
                      className="modal-opciones-pago_body-input"
                    />
                  </div>
                  <button
                    className={donacion === undefined ? "modal-opciones-pago_body-btn modal-opciones-pago_body-btn-disabled" : donacion.length === 0 ? "modal-opciones-pago_body-btn modal-opciones-pago_body-btn-disabled" : "modal-opciones-pago_body-btn"}
                    disabled={donacion === undefined ? true : donacion.length === 0 ? true : false}>
                    Donar
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      }
      <div className='aportes-container'>
        <div className='aportes-container-background'>
          <div className='aportes-title'>
            <p>¿Queres hacer un aporte?</p>
          </div>
          <div className='aportes-body'>
            <div className='aportes-body_info'>
              <p className='aportes-body_info-title'>¿Que hacemos con tu donación?</p>
              <p className='aportes-body_info-body'>
              ¡Bienvenido a nuestra página de donaciones! En Gluten Cero, estamos comprometidos a apoyar a organizaciones benéficas y a financiar investigaciones dedicadas a mejorar la vida de las personas afectadas por la enfermedad celíaca.
              Tu aporte puede marcar una diferencia significativa en la vida de muchos! 
              </p>
            </div>
            <div className='aportes-body_info-content'>
              <div className='aportes-up-container'>
                <div className='aportes-body_info-left-content'>
                  <img src="/src/assets/images/aportes/books.jpeg" alt="" className="aportes-body_info-content-image" />
                  <div className='left-column'>
                    <h2>Educación y Concienciación</h2>
                    <p>La enfermedad celíaca es a menudo subestimada o malentendida.
                      Con tu apoyo, podemos colaborar con organizaciones que trabajan para aumentar la comprensión general sobre esta condición médica y educar a la comunidad sobre la importancia de una dieta sin gluten.
                    </p>
                  </div>
                </div>
                <div className='aportes-body_info-right-content'>
                  <div className='right-column'>
                    <h2>Acceso a una Alimentación Segura</h2>
                    <p> La dieta sin gluten es esencial para las personas con enfermedad celíaca, pero puede ser costosa y difícil de seguir. Tus donaciones ayudarán a financiar programas que proporcionan recursos y apoyo a las personas, para acceder a alimentos seguros y nutritivos.</p>
                  </div>
                  <img src="/src/assets/images/aportes/food.jpeg" alt="" className="aportes-body_info-content-image" />
                </div>
              </div>
              <div className="aportes-bottom-container">
                <img src="/src/assets/images/aportes/hands.jpeg" alt="Imagen inferior" className="aportes-body_info-content-image" />
                <div className='aportes-body_info-bottom-content'>
                  <h2>Fomentar la Inclusión</h2>
                  <p>Queremos que las personas con enfermedad celíaca se sientan incluidas y capacitadas en todas las áreas de la vida. Tu apoyo nos permitirá trabajar con organizaciones que abogan por políticas inclusivas, promueven opciones sin gluten en restaurantes y establecimientos, esforzandose por eliminar barreras sociales y culturales.</p>
                </div>
              </div>
              <div className='aportes-body_info'>
                <p className='aportes-body_info-body'>
                  Cada donación nos acerca un paso más a nuestro objetivo de mejorar la vida de las personas afectadas por la enfermedad celíaca. Con tu ayuda, podemos hacer una diferencia real y duradera apoyando a organizaciones benéficas y financiando investigaciones cruciales. ¡Gracias por considerar apoyarnos en esta importante misión!
                </p>
              </div>
            </div>
            <div className="aportes-body_btn">
              <div className="btn-donar-container">
                <button className="btn-donar" onClick={() => setIsTermsModalVisible(true)} disabled={isModalOpen}>Donar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TerminosAportes
        visible={isTermsModalVisible}
        onAccept={handleTermsAccept}
        onDecline={handleTermsDecline}
      />
    </>
  );
};
