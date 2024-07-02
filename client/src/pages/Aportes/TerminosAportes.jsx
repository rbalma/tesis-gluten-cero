import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import './TerminosAportes.css';

const TerminosAportes = ({ visible, onAccept, onDecline }) => {
    return (
      <Modal
        title={<div className="modal-title">Términos y Condiciones</div>}
        open={visible}
        onCancel={onDecline}
        footer={[
          <Button key="decline" onClick={onDecline}>
            Rechazar
          </Button>,
          <Button key="accept" type="primary" onClick={onAccept}>
            Aceptar
          </Button>,
        ]}
        centered
        className="terms-modal"
      >
        <div className="modal-content">
          <h3 className="modal-subtitle">1. Introducción</h3>
            <p>Estos Términos y Condiciones regulan el uso del servicio de donaciones ofrecido en Gluten Cero, destinada a la comunidad celíaca.
               Al realizar una donación, aceptas los términos y condiciones aquí establecidos.</p>
          <h3 className="modal-subtitle">2. Destino de los Fondos</h3>
            <p>Todas las donaciones realizadas a través de Gluten Cero serán destinadas exclusivamente a</p>
            <ul>
              <li>Organizaciones benéficas que apoyan a personas con celiaquía.</li>
              <li>Proyectos de investigación científica sobre la celiaquía.</li>
            </ul>
            <p>Ninguna parte de los fondos donados será utilizada para fines personales, administrativos de la página web o cualquier otro propósito que no sea el especificado anteriormente.</p>
          <h3 className="modal-subtitle">3. Transparencia y Uso de Fondos</h3>
            <p>Nos comprometemos a mantener la máxima transparencia en el uso de los fondos recibidos.
               Publicaremos informes periódicos detallando las donaciones recibidas y su utilización, asegurando que los recursos sean gestionados de manera responsable y eficiente.</p>
          <h3 className="modal-subtitle">4. Política de Reembolso</h3>
            <p>Las donaciones realizadas son definitivas y no reembolsables. Te recomendamos que te asegures de tu decisión antes de completar el proceso de donación.</p>
          <h3 className="modal-subtitle">5. Privacidad y Protección de Datos</h3>
            <p>Nos comprometemos a proteger la privacidad de los donantes. Toda la información proporcionada será utilizada exclusivamente para procesar las donaciones y no será compartida con terceros, excepto cuando sea requerido por la ley.</p>
          <h3 className="modal-subtitle">6. Modificaciones de los Términos y Condiciones</h3>
            <p>Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Cualquier cambio será publicado en esta página y entrará en vigencia a partir de su publicación.
               Te recomendamos revisar periódicamente esta sección para estar informado sobre cualquier actualización.</p>
          <h3 className="modal-subtitle">7. Contacto</h3>
            <p>Si tienes alguna pregunta o inquietud sobre estos Términos y Condiciones, por favor contáctanos a través del siguiente correo electrónico: glutencerooficial@gmail.com</p>
        </div>
      </Modal>
    );
  };
  
  export default TerminosAportes;