import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { CategoryList } from '@/components/Categories';
import { mapCategories } from '@/utils/constants';
import { UploadImage } from '@/components/Upload/UploadImage';
import { MapFormContainer } from '@/components/Map/Form/MapFormContainer';
import { BuildingStoreIcon, PhoneIcon } from '@/components/Icons';

import styles from './MapFormPage.module.css';

export const MapFormPage = () => {
	const [form] = Form.useForm();
	const [foto, setFoto] = useState({});

	const handleSubmit = (values) => {
		console.log({ values });
		return;
	};

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
						name='type'
						label='Categoría:'
						rules={[{ required: true, message: 'Selecciona una categoría' }]}>
						<CategoryList categories={mapCategories} />
					</Form.Item>

					<Form.Item
						name='file'
						label='Foto:'
						rules={[{ required: true, message: 'Sube una imagen del sitio' }]}>
						<UploadImage />
					</Form.Item>

					<MapFormContainer form={form} />

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginTop: 20,
						}}>
						<Button style={{ width: 200 }} size='large'>
							Volver
						</Button>

						<Button
							style={{ width: 200 }}
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
