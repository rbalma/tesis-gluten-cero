import { Form, Segmented, Input, Row, Button, Divider, Select } from 'antd';
import { UploadAvatar } from '@/components/Upload/UploadAvatar';
import { useCreateUserDashboard } from '@/services/queries/usersQueries';
import { IconEye, IconEyeOff } from '@/components/Icons';
import { rules } from '@/utils/rulesForm';

export const FormUsers = ({ onCloseDrawer }) => {
	const { isPending: createLoading, mutateAsync: addUser } = useCreateUserDashboard();

	const onFinishForm = async (values) => {
		try {
			await addUser(values);
			onCloseDrawer();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form
			initialValues={{
				active: true,
				type: 'user',
			}}
			onFinish={onFinishForm}
			autoComplete='off'
			className='formAdmin'
			layout='vertical'>
			<Row justify='center'>
				<Form.Item
					name='image'
				>
					<UploadAvatar />
				</Form.Item>
			</Row>

			<Form.Item label='Nombre:' name='name' rules={rules.fullName}>
				<Input />
			</Form.Item>

			<Form.Item label='Apellido:' name='lastname' rules={rules.fullName}>
				<Input />
			</Form.Item>

			<Form.Item label='Correo:' name='email' rules={rules.email}>
				<Input autoComplete='new-password' />
			</Form.Item>

			<Form.Item label='Contraseña:' name='password' rules={rules.password}>
				<Input.Password
					autoComplete='new-password'
					size='large'
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

			<Form.Item label='Tipo:' name='type'>
				<Select
					placeholder=''
					options={[
						{ label: 'Usuario', value: 'user' },
						{ label: 'Administrador', value: 'admin' },
					]}
				/>
			</Form.Item>

			<Form.Item label='Estado:' name='active'>
				<Segmented
					block
					options={[
						{ label: 'Activo', value: true },
						{ label: 'Inactivo', value: false },
					]}
				/>
			</Form.Item>

			<Divider />

			<Row justify='space-between'>
				<Button shape='round' onClick={onCloseDrawer}>
					Cancelar
				</Button>
				<Button
					htmlType='submit'
					type='primary'
					shape='round'
					loading={createLoading}>
					Guardar
				</Button>
			</Row>
		</Form>
	);
};
