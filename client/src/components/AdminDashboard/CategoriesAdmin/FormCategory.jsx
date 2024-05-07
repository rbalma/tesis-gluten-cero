import { useEffect } from 'react';
import { Form, Segmented, Radio, Input, Row, Button, Divider } from 'antd';
import { UploadAvatar } from '@/components/Upload/UploadAvatar';
import {
	useCreateCategory,
	useGetCategoryById,
	useUpdateCategory,
} from '@/services/queries/categoryQueries';
import { categoryGetImage } from '@/utils/fetchData';

export const FormCategory = ({ categoryId, onCloseDrawer }) => {
	const [formInstance] = Form.useForm();
	const { isFetching, data } = useGetCategoryById(categoryId);
	const { isPending: createLoading, mutateAsync: addCategory } =
		useCreateCategory();
	const { isPending: updateLoading, mutateAsync: putCategory } =
		useUpdateCategory(categoryId);

	useEffect(() => {
		if (categoryId && !isFetching) {
			formInstance.setFieldsValue(data);
			const file = [
				{
					uid: data.image,
					name: data.image,
					status: 'done',
					url: categoryGetImage(data.image),
					thumbUrl: categoryGetImage(data.image),
				},
			];

			formInstance.setFieldValue('image', file);
		}
	}, [isFetching]);

	const onFinishForm = async (values) => {
		try {
			if (categoryId) {
				await putCategory({ categoryId, values });
			} else {
				await addCategory(values);
			}

			onCloseDrawer();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form
			initialValues={{
				visible: true,
			}}
			form={formInstance}
			onFinish={onFinishForm}
			autoComplete='off'
			className='formAdmin'
			layout='vertical'>
			<Row justify='center'>
				<Form.Item
					name='image'
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
						min: 4,
						message: 'Mínimo de 4 caracteres',
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
						{ label: 'Visible', value: true },
						{ label: 'No Visible', value: false },
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
					loading={categoryId ? updateLoading : createLoading}>
					Guardar
				</Button>
			</Row>
		</Form>
	);
};
