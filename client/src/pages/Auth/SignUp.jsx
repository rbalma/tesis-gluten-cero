import { Form, Input, Row, Col } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logoGlutenCero.png';

import styles from './SignUp.module.css';

export const SignUp = () => {
	const onSubmit = async values => {
		// setIsLoading(true);
		// await sleep(1000);
		console.log({ values });
	};

	return (
		<div className={styles.container}>
			<div className={styles.banner}></div>

			<div className={styles.box}>
				<div className={styles.form}>
					<div className={styles.logo}>
						<img src={Logo} alt='glutenCeroLogo' width={180} />
					</div>

					<p className={styles.title}>Crea una cuenta:</p>

					<Form
						layout='vertical'
						onFinish={onSubmit}
						requiredMark={false}
						autoComplete='off'
						validateTrigger='onSubmit'
					>
						<Row gutter={24}>
							<Col sm={12} xs={24}>
								<Form.Item
									name='nombre'
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
									name='apellido'
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
							name='correo'
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
							extra='Debe contener número, letra mayúscula y al menos 8 caracteres'
							rules={[
								{
									required: true,
									message: 'La contraseña es obligatoria',
								},
								{
									pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
									message: 'La contraseña no respeta los requisitos:',
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
									message: 'Debe confirmar tu contraseña',
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
							<button
								// disabled={isLoading && true}
								type='submit'
								className={styles.btn}
							>
								{/* {isLoading ? "Ingresando..." : "Ingresar"} */}
								Registrarse
							</button>
						</div>

						<div className={styles.footer}>
							<hr className={styles.dotted} />
							<Link to={'/password-perdida'}>
								<small>¿Olvidaste tu contraseña?</small>
							</Link>
							<small>
								¿Ya tienes una cuenta?{' '}
								<Link to={'/ingreso'}>Ingresa ahora </Link>
							</small>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};
