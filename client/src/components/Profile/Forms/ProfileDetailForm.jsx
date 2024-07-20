import { Button, Form, Input, Row } from 'antd';
import { UploadAvatar } from '@/components/Upload/UploadAvatar';
import { userGetAvatar } from '@/utils/fetchData';
import useAuthStore from '@/store/authStore';
import { rules } from '@/utils/rulesForm';

import styles from './ProfileForm.module.css';

export const ProfileDetailForm = () => {
	const user = useAuthStore((state) => state.userProfile);

	return (
		<Form
			initialValues={{
				image: [
					{
						uid: user.avatar,
						name: user.avatar,
						status: 'done',
						url: userGetAvatar(user.avatar),
						thumbUrl: userGetAvatar(user.avatar),
					},
				],
				name: user.name,
				lastname: user.lastname,
				email: user.email,
			}}
			autoComplete='off'
			layout='vertical'>
			<Row justify='center'>
				<Form.Item name='image' style={{ position: 'relative' }}>
					<UploadAvatar />
				</Form.Item>
			</Row>

			<Form.Item name='name' label='Nombre' rules={rules.fullName}>
				<Input size='large' />
			</Form.Item>

			<Form.Item name='lastname' label='Apellido' rules={rules.fullName}>
				<Input size='large' />
			</Form.Item>

			<Form.Item name='email' label='Correo' rules={rules.email}>
				<Input size='large' />
			</Form.Item>

			<Button
				type='primary'
				size='large'
				danger
				shape='round'
				className={styles.profileFormBtn}>
				Guardar Cambios
			</Button>
		</Form>
	);
};
