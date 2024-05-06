import { Button, Form, Input } from 'antd';
import { IconUpload } from '@/components/Icons';
import { rules } from '@/utils/rulesForm';

import styles from './ProfileForm.module.css';

export const ProfileDetailForm = () => {
	return (
		<Form autoComplete='off' layout='vertical'>
			<Form.Item name='avatar' style={{ position: 'relative' }}>
				<>
				<img
					alt='avatar'
					src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70'
					className={styles.profileFormImage}
				/>
				<button className={styles.profileUploadBtn}>
					<IconUpload /> Subir Foto
				</button>
				</>
			</Form.Item>

			<Form.Item name='name' label='Nombre' rules={rules.fullName}>
				<Input size='large' />
			</Form.Item>

			<Form.Item name='lastName' label='Apellido' rules={rules.fullName}>
				<Input size='large' />
			</Form.Item>

			<Form.Item name='mail' label='Correo' rules={rules.email}>
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
