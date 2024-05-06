import { Form, Segmented, Radio, Input, Row, Button, Divider } from 'antd';
import { UploadAvatar } from '@/components/Upload/UploadAvatar';

export const FormCategory = ({ onCloseDrawer }) => {
	const onFinishForm = (values) => {
		console.log({ values });
	};

	return (
		<Form
			initialValues={{
				visible: '1',
			}}
			onFinish={onFinishForm}
			autoComplete='off'
      className='formAdmin'
			layout='vertical'>
			<Row justify='center'>
				<Form.Item
					name='avatar'
					rules={[
						{
							required: true,
							message: 'Agrega una foto',
						},
					]}>
					<UploadAvatar />
				</Form.Item>
			</Row>

			<Form.Item
				label='Nombre:'
				name='name'
				rules={[
					{
						required: true,
						message: 'Ingresa un nombre',
					},
					{
						min: 8,
						message: 'Mínimo de 8 caracteres',
						validateTrigger: 'onSubmit',
					},
					{
						whitespace: true,
						message: 'El campo está vacío',
						validateTrigger: 'onSubmit',
					},
				]}>
				<Input />
			</Form.Item>

			<Form.Item
				label='Tipo:'
				name='type'
				rules={[
					{
						required: true,
						message: 'Selecciona una opción',
					},
				]}>
				<Radio.Group>
					<Radio value='R'>Receta</Radio>
					<Radio value='M'>Mapa</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item label='Estado:' name='visible'>
				<Segmented
					block
					options={[
						{ label: 'Visible', value: '1' },
						{ label: 'No Visible', value: '0' },
					]}
				/>
			</Form.Item>

			<Divider />

			<Row justify='space-between'>
				<Button shape='round' onClick={onCloseDrawer}>
					Cancelar
				</Button>
				<Button htmlType='submit' type='primary' shape='round'>
					Guardar
				</Button>
			</Row>
		</Form>
	);
};
