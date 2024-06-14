import { Form, Input, Button, Segmented } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { Link, useNavigate } from 'react-router-dom';
import { CategoriesSkeleton, CategoryList } from '@/components/Categories';
import { UploadImage } from '@/components/Upload/UploadImage';
import { MapFormContainer } from '@/components/Map/Form/MapFormContainer';
import { BuildingStoreIcon, IconArrowBackUp, PhoneIcon } from '@/components/Icons';
import { SuccessMessageForm } from '@/components/SuccessForm/SuccessMessageForm';
import { useCreateMarker } from '@/services/queries/mapQueries';
import { useGetCategories } from '@/services/queries/categoryQueries';

import styles from './MapFormPage.module.css';

const categoriesFilters = {
	type: 'M',
	visible: '1'
}

export const MapFormPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { isLoading: isLoadingCategories, data: categories } = useGetCategories(categoriesFilters);
	const createMarker = useCreateMarker();

	const handleSubmit = async (values) => {
		try {
			await createMarker.mutateAsync(values);
			setIsSuccessRecipe(true);
		} catch (error) {
			console.log(error);
		}
	};

	if (createMarker.isSuccess)
		return (
			<SuccessMessageForm>
				<h1>El marcador fue creado con éxito</h1>
				<Link to='/mapa'>
					{' '}
					<IconArrowBackUp size={20} /> Regresar al mapa
				</Link>
			</SuccessMessageForm>
		);

	return (
		<div className={styles.containerMapaFormulario}>
			<div className={styles.mapaFormulario}>
				<h3 className={styles.mapaTitulo}>Completa los datos del Marcador</h3>

				<Form
					layout='vertical'
					form={form}
					onFinish={handleSubmit}
					autoComplete='off'
					requiredMark={false}
					className='formItemMapLabel'>
					<Form.Item
						name='name'
						label='Nombre:'
						rules={[
							{ required: true, message: 'Ingresa el nombre del sitio' },
						]}>
						<Input
							placeholder=''
							className='formItemMapInput'
							prefix={<BuildingStoreIcon />}
						/>
					</Form.Item>

					<Form.Item
						name='phone'
						label='Teléfono:'
						rules={[
							{ required: true, message: 'Ingresa un teléfono de contacto' },
						]}>
						<MaskedInput
							mask={'(0000) 000-0000'}
							prefix={<PhoneIcon />}
							className='formItemMapInput'
						/>
					</Form.Item>

					<Form.Item
						name='category'
						label='Categoría:'
						rules={[{ required: true, message: 'Selecciona una categoría' }]}>
						{isLoadingCategories ? (
							<CategoriesSkeleton />
						) : (
							<CategoryList categories={categories} />
						)}
					</Form.Item>

					<Form.Item
						name='image'
						label='Foto:'
						rules={[{ required: true, message: 'Sube una imagen del sitio' }]}>
						<UploadImage />
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

					<MapFormContainer form={form} />

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 20,
						}}>
						<Button style={{ width: 200 }} size='large' onClick={() => navigate(-1)}>
							Volver
						</Button>

						<Button
							style={{ width: 200 }}
							loading={createMarker.isPending}
							type='primary'
							size='large'
							htmlType='submit'>
							Confirmar
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
