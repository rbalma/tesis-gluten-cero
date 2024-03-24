import { Button, Form, Input } from 'antd';
import { rules } from '@/utils/rulesForm';

import styles from './ProfileForm.module.css';
import { IconUpload } from '@/components/Icons';

export const ProfileDetailForm = () => {
	return (
		<Form layout='vertical'>
			<Form.Item name='avatar' style={{ position: 'relative' }}>
				<img
					alt='avatar'
					src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=70'
					className={styles.profileFormImage}
				/>
				<button className={styles.profileUploadBtn}><IconUpload /> Subir Foto</button>
			</Form.Item>

			<Form.Item label='Nombre' rules={rules.fullName}>
				<Input size='large' />
			</Form.Item>

			<Form.Item label='Apellido' rules={rules.fullName}>
				<Input size='large' />
			</Form.Item>

			<Form.Item label='Correo' rules={rules.email}>
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
