import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png';

import styles from './ForgotPassword.module.css';

export const ForgotPassword = () => {
	const onSubmit = async values => {
		setIsLoading(true);
		// await sleep(1000);
		console.log({ values });
	};

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.sideImage}></div>

				<div className={styles.form}>
					<div className={styles.logo}>
						<img src={Logo} alt='glutenCeroLogo' width={150} />
					</div>

					<h2 className={styles.title}>¿No recuerdas tu contraseña?</h2>
					<p className={styles.text}>
						Lo entendemos, pasan cosas. Simplemente ingrese su dirección de
						correo electrónico a continuación y le enviaremos un enlace para
						restablecer su contraseña.
					</p>

					<Form
						layout='vertical'
						onFinish={onSubmit}
						requiredMark={false}
						validateTrigger='onSubmit'
						autoComplete='off'
					>
						<Form.Item
							name='correo'
							rules={[
								{
									required: true,
									message: 'El correo es obligatorio',
								},
							]}
						>
							<Input placeholder='Correo' />
						</Form.Item>

						<button
							// disabled={isLoading && true}
							type='submit'
							className={styles.btn}
						>
							{/* {isLoading ? "Ingresando..." : "Ingresar"} */}
							Enviar correo
						</button>

						<div className={styles.footer}>
							<hr className={styles.dotted} />
							<Link to={'/password-perdida'} className={styles.link}>
								<span>Crear una cuenta</span>
							</Link>
							<span>
								¿Ya tienes una cuenta?{' '}
								<Link to={'/ingreso'} className={styles.link}>
									Ingresa
								</Link>
							</span>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};
