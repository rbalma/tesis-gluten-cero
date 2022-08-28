import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logoGlutenCero.png';
import useAuthStore from '@/store/authStore';
import useCrud from '@/hooks/useCrud';

import styles from './Login.module.css';

export const Login = () => {
	const { userProfile, addUser } = useAuthStore();
	const navigate = useNavigate();
	const { 2: postLogin } = useCrud('/sign-in');

	const onSubmit = async values => {
		//setIsLoading(true);
		// await sleep(1000);
		const data = await postLogin({...values});
		//console.log({data})
		addUser(data.user);
		navigate('/');
	};

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.form}>
					<div className={styles.divLogo}>
						<Link to={'/'}>
							<img src={Logo} alt='glutenCeroLogo' width={180} />
						</Link>
					</div>

					<p className={styles.title}>Ingresa tus datos:</p>

					<Form
						layout='vertical'
						onFinish={onSubmit}
						requiredMark={false}
						validateTrigger='onSubmit'
						autoComplete='off'
						initialValues={{
							email: 'balmarodrigo@hotmail.com',
							password: 'T@lleres2020',
						}}
					>
						<Form.Item
							name='email'
							rules={[
								{
									required: true,
									message: 'El correo es obligatorio',
								},
							]}
						>
							<Input placeholder='Correo' />
						</Form.Item>

						<Form.Item
							name='password'
							rules={[
								{
									required: true,
									message: 'La contraseña es obligatoria',
								},
							]}
						>
							<Input.Password placeholder='Contraseña' />
						</Form.Item>

						<button
							// disabled={isLoading && true}
							type='submit'
							className={styles.btnLogin}
						>
							{/* {isLoading ? "Ingresando..." : "Ingresar"} */}
							Iniciar Sesión
						</button>

						<div className={styles.footer}>
							<hr className={styles.dotted} />
							<button
								// disabled={isLoading && true}
								type='submit'
								className={`${styles.btnLogin} ${styles.btnGoogle}`}
							>
								{/* {isLoading ? "Ingresando..." : "Ingresar"} */}
								Ingresar con Google
							</button>
							<small className='gx-mt-2'>
								<Link to={'/password-perdida'}>
									¿Olvidaste tu contraseña?
								</Link>
							</small>
							<small>
								¿Eres nuevo en Gluten Cero?{' '}
								<Link to={'/registro'}>
									Únete ahora{' '}
								</Link>
							</small>
						</div>
					</Form>
				</div>

				<div className={styles.sideImage}></div>
			</div>
		</div>
	);
};
