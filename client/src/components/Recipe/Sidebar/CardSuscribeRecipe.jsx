import { Button, Form, Input } from 'antd';
import suscribeRecipe from '@/assets/images/recipe-suscribe.png';

import styles from './CardSuscribeRecipe.module.css';
import { rules } from '@/utils/rulesForm';

export const CardSuscribeRecipe = () => {
	return (
		<div className={styles.containerSuscribeRecipe}>
			<img src={suscribeRecipe} />
			<div className={styles.contentSuscribeRecipe}>
				<span>Suscríbete hoy</span>
				<h2>Nunca te pierdas una receta</h2>

				<Form>
					<Form.Item name='email' rules={rules.email}>
						<Input placeholder='Correo' />
					</Form.Item>
					<Button type='primary' danger block>
						Suscríbete
					</Button>
				</Form>

				<div className={styles.extraInfoSuscribeRecipe}>
					<small>No te enviaremos spam.</small>
					<small>Puedes darte de baja en cualquier momento.</small>
				</div>
			</div>
		</div>
	);
};
