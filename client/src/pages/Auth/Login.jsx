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
	const { addUser } = useAuthStore();
	const [formInstance] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [ isLoadingGoogle, postGoogleLogin ] = useCrud('/login-google');
	
	const userId = useMemo(() => search.split('=')[1], []);

	const onSubmit = async (values) => {
		try {
			setIsLoading(true);
			const { data } = await axiosInstance.post( '/login', { ...values } );
			if (data.ok) {
				addUser(data.user, data.token);
				//toast.success('Bienvenido a Gluten Cero');
				navigate('/');
			}
		} catch (error) {
			const messageError = `${error.response?.data.message}`;

			if (messageError.includes('cuenta')) return setModalVisible(true);

			formInstance.setFields([
				{
					name: 'email',
					errors: messageError.includes('correo')
						? [`${error.response?.data.message}`]
						: '',
				},
				{
					name: 'password',
					errors: messageError.includes('contraseña')
						? [`${error.response?.data.message}`]
						: '',
				},
			]);
		} finally {
			setIsLoading(false);
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
								// disabled={isLoading && true}
								type='button'
								onClick={onGoogleLoginClick}
								className={`${styles.btnLogin} ${styles.btnGoogle}`}
							>
								{/* {isLoading ? "Ingresando..." : "Ingresar"} */}
								Ingresar con Google
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
