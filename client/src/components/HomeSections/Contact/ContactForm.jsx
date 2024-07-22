import { Col, Form, Input, Row } from 'antd';
import styles from './ContactForm.module.css';
import { MailOutlined } from '@ant-design/icons';
import { rules } from '@/utils/rulesForm';

export const ContactForm = () => {
	return (
		<div className={styles.contactContainer} id='contacto'>
			<div className={styles.contactFlex}>
				<div className={styles.contactInfo}>
					<h1 className={styles.contactTitle}>Formulario de <br /> <span>Contacto</span></h1>
					<p>
						Si tienes alguna pregunta o sugerencia sobre cualquier tema, no
						dudes en escribirnos. Estamos a tu disposición.
					</p>

				<span><MailOutlined style={{ marginRight: 8 }}/> glutencerooficial@gmail.com</span>
				</div>

				<div className={styles.formBody}>
					<h3>Nos encantaría saber sobre ti</h3>

					<Form layout='vertical' requiredMark autoComplete='off'>
						<Row gutter={24}>
							<Col sm={12} xs={24}>
								<Form.Item
									name='name'
									label='Nombre completo'
									rules={rules.fullName}>
									<Input type='string' />
								</Form.Item>
							</Col>

							<Col sm={12} xs={24}>
								<Form.Item name='email' label='Email' rules={rules.email}>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Form.Item name='subject' label='Asunto' rules={rules.subject}>
							<Input type='string' />
						</Form.Item>

						<Form.Item name='message' label='Mensaje' rules={rules.message}>
							<Input.TextArea
								type='string'
								placeholder='Escribe tu mensaje...'
								autoSize={{
									minRows: 4,
									maxRows: 4,
								}}
							/>
						</Form.Item>

						<button>Enviar mensaje</button>
					</Form>
				</div>
			</div>
		</div>
	);
};
