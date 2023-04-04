import { useState } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logoGlutenCero.png';
import useCrud from '@/hooks/useCrud';
import { AccountConfirmMail } from './ui';

import styles from './SignUp.module.css';

export const SignUp = () => {
	const [formInstance] = Form.useForm();
	const [isLoading, postUser] = useCrud('/users');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onSubmit = async (user) => {
		const data = await postUser(user);
		if (data?.ok) setIsModalOpen(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.banner}></div>

			<div className={styles.box}>
				<div className={styles.form}>
					<div className={styles.divLogo}>
						<Link to={'/'}>
							<img src={Logo} alt='glutenCeroLogo' width={180} />
						</Link>
					</div>

					<p className={styles.title}>Crea una cuenta:</p>

					<Form
						layout='vertical'
						form={formInstance}
						onFinish={onSubmit}
						requiredMark={false}
						autoComplete='off'
					>
						<Row gutter={24}>
							<Col sm={12} xs={24}>
								<Form.Item
									name='name'
									rules={[
										{
											required: true,
											message: 'El nombre es obligatorio',
										},
									]}
								>
									<Input
										prefix={<UserOutlined className='margin-icon' />}
										placeholder='Nombre'
									/>
								</Form.Item>
							</Col>

							<Col sm={12} xs={24}>
								<Form.Item
									name='lastname'
									rules={[
										{
											required: true,
											message: 'El apellido es obligatorio',
										},
									]}
								>
									<Input
										prefix={<UserOutlined className='margin-icon' />}
										placeholder='Apellido'
									/>
								</Form.Item>
							</Col>
						</Row>

						<Form.Item
							name='email'
							hasFeedback
							rules={[
								{
									required: true,
									message: 'El correo es obligatorio',
								},
								{
									type: 'email',
									message: 'Debe ingresar un correo válido',
								},
							]}
						>
							<Input
								prefix={<MailOutlined className='margin-icon' />}
								placeholder='Correo electrónico'
							/>
						</Form.Item>

						<Form.Item
							name='password'
							hasFeedback
							rules={[
								{
									required: true,
									message: 'La contraseña es obligatoria',
								},
								{
									pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,30}$/,
									message: 'Entre 8 y 30 caracteres. Como mínimo una letra minúscula, una letra mayúscula y un número.',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined className='margin-icon' />}
								placeholder='Contraseña'
							/>
						</Form.Item>

						<Form.Item
							name='confirmarContraseña'
							hasFeedback
							dependencies={['password']}
							rules={[
								{
									required: true,
									message: 'Debe confirmar la contraseña',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}

										return Promise.reject(
											new Error(
												'Las dos contraseñas que ingresaste no coinciden'
											)
										);
									},
								}),
							]}
						>
							<Input.Password
								prefix={<LockOutlined className='margin-icon' />}
								placeholder='Confirmar contraseña'
							/>
						</Form.Item>

						<div className={styles.btnPosition}>
							<button disabled={isLoading} type='submit' className={styles.btn}>
								{isLoading ? 'Registrando...' : 'Registrarse'}
							</button>
						</div>

						<div className={styles.footer}>
							<hr className={styles.dotted} />
							<small>
								<Link to={'/password-perdida'}>¿Olvidaste tu contraseña?</Link>
							</small>
							<small>
								¿Ya tienes una cuenta?{' '}
								<Link to={'/ingreso'}>Ingresa ahora </Link>
							</small>
						</div>
					</Form>
				</div>
			</div>

			<AccountConfirmMail open={isModalOpen} formInstance={formInstance} />
		</div>
	);
};
