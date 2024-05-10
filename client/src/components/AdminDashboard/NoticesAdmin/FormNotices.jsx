import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Segmented, Input, Row, Button, Divider } from 'antd';
import { format, parse } from 'date-fns';
import esEs from 'antd/es/date-picker/locale/en_US';
import { DatePicker } from '../DatePicker';
import { UploadAvatar } from '@/components/Upload/UploadAvatar';
import {
	useCreateNotice,
	useUpdateNotice,
} from '@/services/queries/noticeQueries';
import { noticeGetImage } from '@/utils/fetchData';

export const FormNotices = ({ noticeId, onCloseDrawer }) => {
	const queryClient = useQueryClient();
	const [formInstance] = Form.useForm();
	const { isPending: createLoading, mutateAsync: addNotice } =
		useCreateNotice();
	const { isPending: updateLoading, mutateAsync: putNotice } =
		useUpdateNotice(noticeId);

	useEffect(() => {
		if (noticeId) {
			const data = queryClient.getQueryData(['notices', noticeId]);
			formInstance.setFieldsValue(data);
			const file = [
				{
					uid: data.image,
					name: data.image,
					status: 'done',
					url: noticeGetImage(data.image),
					thumbUrl: noticeGetImage(data.image),
				},
			];

			formInstance.setFieldValue('image', file);
			const result = format(new Date(data.date), 'dd-MM-yyyy');
			formInstance.setFieldValue(
				'date',
				parse(result, 'dd-MM-yyyy', new Date())
			);
		}
	}, []);

	const onFinishForm = async (values) => {
		try {
			if (noticeId) {
				await putNotice({ noticeId, values });
			} else {
				await addNotice(values);
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
					<UploadAvatar width={250} aspectRatio={16 / 9} />
				</Form.Item>
			</Row>

			<Form.Item
				label='Título:'
				name='title'
				rules={[
					{
						required: true,
						message: 'Ingresa un título',
					},
					{
						min: 4,
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
				label='Fuente:'
				name='source'
				rules={[
					{
						required: true,
						message: 'Ingresa la fuente de información',
					},
				]}>
				<Input />
			</Form.Item>

			<Form.Item
				label='Enlace:'
				name='link'
				rules={[
					{
						required: true,
						message: 'Ingresa el link de la noticia',
					},
					{
						type: 'url',
						message: 'No es un enlace válido',
						validateTrigger: 'onSubmit',
					},
				]}>
				<Input />
			</Form.Item>

			<Form.Item
				label='Fecha de publicación:'
				name='date'
				rules={[
					{
						required: true,
						message: 'Selecciona una fecha',
					},
				]}>
				<DatePicker
					placeholder=''
					format='DD-MM-YYYY'
					showToday={false}
					locale={{
						lang: {
							...esEs.lang,
							shortWeekDays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
							shortMonths: [
								'Enero',
								'Febrero',
								'Marzo',
								'Abril',
								'Mayo',
								'Junio',
								'Julio',
								'Agosto',
								'Septiembre',
								'Octubre',
								'Noviembre',
								'Diciembre',
							],
						},
					}}
					style={{ width: '100%' }}
				/>
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
					loading={noticeId ? updateLoading : createLoading}>
					Guardar
				</Button>
			</Row>
		</Form>
	);
};
