import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import Logo from '@/assets/images/logo.png';
import useCrud from '@/hooks/useCrud';

import styles from './ResetPassword.module.css';
import { toast } from 'sonner';

export const ResetPassword = () => {
	const { resetToken } = useParams();
	const { 0: isLoading, 3: resetPassword } = useCrud('/reset-password');

	const onSubmit = async values => {
		const data = await resetPassword(resetToken, values);
		if (data?.ok) toast.success('Contraseña actualizada con éxito');
		if (data?.error) toast.error(data.error);
	};

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.form}>
					<div className={styles.logo}>
						<Link to='/ingreso'>
							<img src={Logo} alt='glutenCeroLogo' width={180} />
						</Link>
					</div>

					<p className={styles.title}>Ingresa tu nueva contraseña:</p>

					<Form
						layout='vertical'
						onFinish={onSubmit}
						requiredMark={false}
						validateTrigger='onSubmit'
						autoComplete='off'
					>
						<Form.Item
							name='password'
							rules={[
								{
									required: true,
									message: 'La contraseña es obligatoria',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined className='margin-icon' />}
								placeholder='Contraseña'
							/>
						</Form.Item>

						<Form.Item
							name='resetPassword'
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

						<button
							disabled={isLoading}
							type='submit'
							className={styles.btnLogin}
						>
							Aceptar
						</button>
					</Form>
				</div>
			</div>
		</div>
	);
};
