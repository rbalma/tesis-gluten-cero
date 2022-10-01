import React from 'react';
import { PushpinOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import styles from './ThreadsList.module.css';

export const ThreadsList = () => {
	return (
		<div className={styles.bgScreenThread}>
			<div className={styles.cardListThread}>
				<div className={styles.headListThread}>
					<span className={styles.firstItem}>Hilos</span>
					<span className={styles.secondItem}>Posteos</span>
					<span className={styles.threadItem}>Última Actividad</span>
				</div>

				<div className={styles.bodyListThread}>
					<div className={styles.firstItem}>
						<p className={styles.titleThread}>
							{' '}
							<PushpinOutlined /> HTML Tutorial and Reference
						</p>
						<span className={styles.extraThread}>
							{' '}
							<UserOutlined /> Kcarson,{' '}
							<ClockCircleOutlined style={{ marginLeft: '8px' }} /> November 16,
							2005.
						</span>
						<span className=''>
							Abierto
						</span>
					</div>

					<div className={`${styles.secondItem} ${styles.posteosListThread}`}>5</div>

					<span className={`${styles.threadItem} ${styles.titleOculto}`}>
						Última Actividad
					</span>
					<div className={`${styles.threadItem} ${styles.lastActivity}`}>
						<Avatar size={50} icon={<UserOutlined />} />
						<div>
							<p className={styles.user}> HTML Tutorial and Reference</p>
							<span className={styles.userTime}> November 16, 2005</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
