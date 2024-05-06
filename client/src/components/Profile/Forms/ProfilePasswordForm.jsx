import { Button, Form, Input } from 'antd';
import { IconEye, IconEyeOff } from '@/components/Icons';
import { rules } from '@/utils/rulesForm';

import styles from './ProfileForm.module.css';

export const ProfilePasswordForm = () => {
	return (
		<Form
			autoComplete='off'
			layout='vertical'
			onFinish={() => console.log('fin')}>
			<Form.Item
				name='currentPassword'
				label='Contraseña Actual'
				style={{ paddingBottom: 10 }}
				rules={rules.password}>
				<Input.Password
					size='large'
					style={{ marginBottom: 3 }}
					iconRender={(visible) =>
						visible ? (
							<small style={{ cursor: 'pointer' }}>
								<IconEye size={20} />
							</small>
						) : (
							<small style={{ cursor: 'pointer' }}>
								<IconEyeOff size={20} />
							</small>
						)
					}
				/>
			</Form.Item>

			<Form.Item
				name='newPassword'
				label='Nueva Contraseña'
				style={{ paddingBottom: 10 }}
				rules={rules.password}>
				<Input.Password
					size='large'
					style={{ marginBottom: 3 }}
					iconRender={(visible) =>
						visible ? (
							<small style={{ cursor: 'pointer' }}>
								<IconEye size={20} />
							</small>
						) : (
							<small style={{ cursor: 'pointer' }}>
								<IconEyeOff size={20} />
							</small>
						)
					}
				/>
			</Form.Item>

			<Form.Item
				name='ConfirmNewPassword'
				label='Confirmar Nueva Contraseña'
				style={{ paddingBottom: 10 }}
				rules={rules.passwordConfirm}>
				<Input.Password
					size='large'
					style={{ marginBottom: 3 }}
					iconRender={(visible) =>
						visible ? (
							<small style={{ cursor: 'pointer' }}>
								<IconEye size={20} />
							</small>
						) : (
							<small style={{ cursor: 'pointer' }}>
								<IconEyeOff size={20} />
							</small>
						)
					}
				/>
			</Form.Item>

			<Button
				htmlType='submit'
				size='large'
				type='primary'
				danger
				shape='round'
				className={styles.profileFormBtn}>
				Modificar Contraseña
			</Button>
		</Form>
	);
};
