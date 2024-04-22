import { Button, Form, Input, Rate } from 'antd';
import styles from './FormCommentRecipe.module.css';
import { rules } from '@/utils/rulesForm';

export const FormCommentRecipe = () => {
	return (
		<div className={styles.formCommentContainer}>
			<div className={styles.headerFormComment}>
				<div className={styles.contentHeaderFormComment}>
					<h2>¿Te gustó la receta?</h2>
					<p>
						Deja una calificación de estrellas y una reseña en el siguiente
						formulario. Agradezo tus comentarios y que sirvan de ayuda a otros
					</p>
				</div>
			</div>

			<div className={styles.formCommentRecipe}>
				<Form>
					<Form.Item name='rate' label='Calificación' style={{ marginBottom: 8 }}>
						<Rate />
					</Form.Item>
					<Form.Item name='comentario' rules={rules.message}>
						<Input.TextArea
							showCount
							maxLength={150}
							autoSize={{ minRows: 3 }}
							placeholder='Escribe tu reseña'
						/>
					</Form.Item>

					<Button className='btn-success' shape='round' style={{ marginTop: 10 }}>
						Agregar Comentario
					</Button>
				</Form>
			</div>
		</div>
	);
};
