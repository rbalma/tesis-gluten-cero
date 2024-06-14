import { useMemo, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Form, Input } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logoGlutenCero.png';

import useAuthStore from '@/store/authStore';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'sonner';

import styles from './Login.module.css';
import { AlertActiveAccount } from './ui';
import useCrud from '@/hooks/useCrud';


export const Login = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const addUser = useAuthStore((state) => state.addUser);
	const [formInstance] = Form.useForm();
	const [ isLoading, postLogin ] = useCrud('/login');
	const [ isLoadingGoogle, postGoogleLogin ] = useCrud('/login-google');
	
	const userId = useMemo(() => search.split('=')[1], []);

	const onSubmit = async (values) => {
		const data = await postLogin({ ...values });
		if (data?.ok) {
			addUser(data.user, data.token);
			//toast.success('Bienvenido a Gluten Cero');
			navigate('/');
		}

		if (data?.error) {
			const messageError = data.error;
			if (!messageError.includes('correo') && !messageError.includes('contraseña')) return toast.error(messageError);

			formInstance.setFields([
				{
					name: 'email',
					errors: messageError.includes('correo')
						? [messageError]
						: '',
				},
				{
					name: 'password',
					errors: messageError.includes('contraseña')
						? [messageError]
						: '',
				},
			]);
		}
	};

	const onGoogleLoginClick = useGoogleLogin({
		onSuccess: ({ code })  => handleGoogleLogin(code),
		onError: () => {
			toast.error('No se pudo autenticar con Google');
		},
		flow: 'auth-code',
	});
	
	
	const handleGoogleLogin = async (code ) => {
		const data = await postGoogleLogin({ code });
		if (data?.ok) {
			addUser(data.user, data.token);
			navigate('/');
		}
	}

	return (
		<div className={styles.container}>
			{userId ? <AlertActiveAccount userId={userId} /> : null}
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
						form={formInstance}
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
							disabled={isLoading && true}
							type='submit'
							className={styles.btnLogin}
						>
							{isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
						</button>

						<div className={styles.footer}>
							<hr className={styles.dotted} />
							<button
								disabled={isLoadingGoogle}
								type='button'
								onClick={onGoogleLoginClick}
								className={`${styles.btnLogin} ${styles.btnGoogle}`}
							>
								{isLoadingGoogle ? "Ingresando..." : "Ingresar con Google"}
							</button>
							<small className='gx-mt-2'>
								<Link to={'/password-perdida'}>¿Olvidaste tu contraseña?</Link>
							</small>
							<small>
								¿Eres nuevo en Gluten Cero?{' '}
								<Link to={'/registro'}>Únete ahora </Link>
							</small>
						</div>
					</Form>
				</div>

				<div className={styles.sideImage}></div>
			</div>
		</div>
	);
};
