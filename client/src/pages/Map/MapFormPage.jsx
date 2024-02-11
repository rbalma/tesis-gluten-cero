import { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';

import 'leaflet/dist/leaflet.css';
import { MaskedInput } from 'antd-mask-input';

import { CategoryList } from '@/components/Categories';
import { mapCategories } from '@/utils/constants';
// import { addMarketApi } from "../../api/map";
// import { getAccessTokenApi } from "../../api/auth";
import styles from './MapFormPage.module.css';
import { UploadImage } from '@/components/Upload/UploadImage';
import { MapFormContainer } from '@/components/MapContainer/MapFormContainer';
import { BuildingStoreIcon, PhoneIcon } from '@/components/Icons';

export const MapFormPage = () => {
	const [form] = Form.useForm();
	const [foto, setFoto] = useState({});

	const handleSubmit = (values) => {
		console.log({ values });
		return;
		const file = foto[0].originFileObj;
		console.log(file);
		const accessToken = getAccessTokenApi();
		addMarketApi(accessToken, values, file)
			.then((res) => {
				if (res.ok) return message.success('marcador creado');
				return message.error(res.message);
			})
			.catch((err) => console.error(err.message));
	};

	return (
		<div className={styles.mapaFormulario}>
			<h3 className={styles.mapaTitulo}>Agrega un Nuevo Marcador al Mapa</h3>

			<Form
				layout='vertical'
				form={form}
				onFinish={handleSubmit}
				autoComplete='off'
				requiredMark={false}
				className='formItemMapLabel'>
				<Row gutter={100}>
					<Col sm={12} xs={24}>
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
					</Col>

					<Col sm={12} xs={24}>
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
					</Col>
				</Row>

				<Row gutter={100} style={{ marginTop: 20 }}>
					{/* UPLOAD FOTO */}
					<Col sm={12} xs={24}>
						<Form.Item
							name='file'
							label='Foto:'
							rules={[
								{ required: true, message: 'Sube una imagen del sitio' },
							]}>
							<UploadImage />
						</Form.Item>
					</Col>

					<Col sm={12} xs={24}>
						<Form.Item
							name='type'
							label='Categoría:'
							className='mapCategoryItem'
							rules={[{ required: true, message: 'Selecciona una categoría' }]}>
							<CategoryList categories={mapCategories} />
						</Form.Item>
					</Col>
				</Row>

				{/* MAPA */}
				<MapFormContainer form={form} />

				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						width: '100%',
					}}>
					<Button
						style={{ width: 400 }}
						type='primary'
						size='large'
						block
						htmlType='submit'>
						Confirmar
					</Button>
				</div>
			</Form>
		</div>
	);
};
