import React from 'react';
import { PushpinOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Card from '../Posts/Card';

import './ThreadsList.css';

// https://account.mongodb.com/account/login?n=%2Fv2&nextHash=%23org%2F60afd24f23992501a9b2b682%2Fprojects

export const ThreadsList = () => {
	return ( 
		<div className='foro-container'>
			<div className='foro-container-background'>
				<div className='foro-header'>
					<div className='foro-header__sections'>
						<div className='foro-header__sections-btn foro-header__sections-btn_active'>Nuevos</div>
						<div className='foro-header__sections-btn'>Populares</div>
					</div>
					<div className='foro-header__search'>
						<input type='text' placeholder='Buscar'></input>
					</div>
				</div>
				<div className='foro-body'>
					<div className='foro-body__title'>
						<p>¡Te damos la bienvenida al foro de la comunidad de Gluten Cero!</p>
					</div>
					<div className='foro-body__content'>
						<Card/>
						<Card/>
						<Card/>
					</div>
				</div>
			</div>
		</div>
	);
};

// export const ThreadsList = () => {
// 	return ( 
// 		<div className={styles.bgScreenThread}>
// 			<div className={styles.cardListThread}>
// 				<div className={styles.headListThread}>
// 					<span className={styles.firstItem}>Hilos</span>
// 					<span className={styles.secondItem}>Posteos</span>
// 					<span className={styles.threadItem}>Última Actividad</span>
// 				</div>

// 				<div className={styles.bodyListThread}>
// 					<div className={styles.firstItem}>
// 						<p className={styles.titleThread}>
// 							{' '}
// 							<PushpinOutlined /> HTML Tutorial and Reference
// 						</p>
// 						<span className={styles.extraThread}>
// 							{' '}
// 							<UserOutlined /> Kcarson,{' '}
// 							<ClockCircleOutlined style={{ marginLeft: '8px' }} /> November 16,
// 							2005.
// 						</span>
// 						<span className=''>
// 							Abierto
// 						</span>
// 					</div>

// 					<div className={`${styles.secondItem} ${styles.posteosListThread}`}>5</div>

// 					<span className={`${styles.threadItem} ${styles.titleOculto}`}>
// 						Última Actividad
// 					</span>
// 					<div className={`${styles.threadItem} ${styles.lastActivity}`}>
// 						<Avatar size={50} icon={<UserOutlined />} />
// 						<div>
// 							<p className={styles.user}> HTML Tutorial and Reference</p>
// 							<span className={styles.userTime}> November 16, 2005</span>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
