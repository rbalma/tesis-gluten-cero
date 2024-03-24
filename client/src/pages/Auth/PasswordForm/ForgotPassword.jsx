import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '@/assets/images/logo.png';
import useCrud from '@/hooks/useCrud';

import styles from './ForgotPassword.module.css';

export const ForgotPassword = () => {

	const [ isLoading, sendMail ] = useCrud('/forgot-password');

	const onSubmit = async mail => {
		const data = await sendMail(mail);
		if (data?.ok) toast.success('Correo enviado');
		if (data?.error) toast.error(data.error);
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
							name='email'
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
							<Input placeholder='Correo' />
						</Form.Item>

						<Button
							loading={isLoading}
							htmlType='submit'
							type='primary'
							className={styles.btn}
						>
							Enviar correo
						</Button>

						<div className={styles.footer}>
							<hr className={styles.dotted} />
							<Link to={'/registro'} className={styles.link}>
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
