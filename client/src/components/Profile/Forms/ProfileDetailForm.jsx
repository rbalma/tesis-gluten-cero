import { useEffect } from 'react';
import { Button, Form, Input, Row, Spin } from 'antd';
import { UploadAvatar } from '@/components/Upload/UploadAvatar';
import { useGetUserById } from '@/services/queries/usersQueries';
import { userGetAvatar } from '@/utils/fetchData';
import { rules } from '@/utils/rulesForm';

import styles from './ProfileForm.module.css';

export const ProfileDetailForm = ({ userId }) => {
	const [formInstance] = Form.useForm();
	const { isFetching, data } = useGetUserById(userId);

	useEffect(() => {
		if (!isFetching && data?._id) {
			formInstance.setFieldsValue(data);
			const file = [
				{
					uid: data.avatar,
					name: data.avatar,
					status: 'done',
					url: userGetAvatar(data.avatar),
					thumbUrl: userGetAvatar(data.avatar),
				},
			];

			formInstance.setFieldValue('image', file);
		}
	}, [isFetching]);

	return (
		<Spin spinning={isFetching} tip='Cargando'>
		<Form form={formInstance} autoComplete='off' layout='vertical'>
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
		</Spin>
	);
};
