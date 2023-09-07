import React from "react";
import { Avatar } from 'antd';
import { UserOutlined, ArrowUpOutlined, MessageFilled } from '@ant-design/icons';
import './Card.css';

export default function Card() {
    return(
        <div className='card-container'>
            <div className='card-user'>
                <Avatar
					size={{ xs: 45, sm: 45, md: 45, lg: 45, xl: 60, xxl: 60 }}
					icon={<UserOutlined />}
				/>
            </div>
            <div className="card-content">
                <div className="card-content__title">
                    <p>Titulo/Pregunta del hilo</p>
                </div>
                <div className="card-content__info">
                    <div className='card-content__info-respuestas'>
                        <MessageFilled />
                        <p>Respuestas</p>
                        <p>5</p>
                    </div>
                    <div className='card-content__info-votos'>
                        <ArrowUpOutlined />
                        <p>10</p>
                        <p>votos</p>
                    </div>
                </div>
            </div>
            <div className="card-status">
                <div className="card-status__estado">
                    <p>Abierto</p>
                </div>
                <div className="card-status__time">
                    <p>10 semanas</p>
                </div>
            </div>
        </div>
    );
};