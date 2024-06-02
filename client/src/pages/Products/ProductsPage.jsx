import { useEffect, useState } from 'react';
import { Table, Form, Row, Col, Input, Button, message, Select, Tag, Tooltip } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Excel } from 'antd-table-saveas-excel';
import useData from '@/hooks/useData';
import useAuthStore from '@/store/authStore';
import {
	useGetProducts,
	useUpdateProduct,
} from '@/services/queries/productsQueries';

import styles from './ProductsPage.module.css';

// https://eddieup.github.io/antd-table-saveas-excel/2api
// https://github.com/webstylepress/Fetch-Data-from-XLSX-Excel-File-in-React-JS/blob/main/src/App.js

export const ProductsPage = () => {
	const { userProfile } = useAuthStore();
	console.log(userProfile);
	const userId = userProfile?.id;
	console.log(userId);
	const [dataFilter, setDataFilter] = useState([]);

	const [form] = Form.useForm();
	const {
		1: isLoadingProducts,
		2: dataProducts
	} = useData('/products-anmat');

	const { isPending: updateLoading, mutateAsync: putProduct } = useUpdateProduct();

	const handleLikeToggle = async (record) => {

		if (!userId) return; // No hacer nada si el usuario no está registrado

		const hasLiked = record.likes.includes(userId);
		const updatedLikes = hasLiked
		  ? record.likes.filter(id => id !== userId)
		  : [...record.likes, userId];

		try {
            await putProduct({ productId: record._id, values: { likes: updatedLikes } });

			// Actualiza el estado local con los productos actualizados
			const updatedProducts = dataFilter.map(product => 
				product._id === record._id ? { ...product, likes: updatedLikes } : product
			);
			setDataFilter(updatedProducts);

        } catch (error) {
            console.error("Error updating likes:", error);
        }
	  };

	useEffect(() => {
		if (dataProducts) setDataFilter(dataProducts);
	}, [dataProducts]);

	const handleSearch = (values) => {
		if (
			!values.rnpa &&
			!values.marca &&
			!values.denominacionVenta &&
			!values.TipoProducto
		) {
			message.error('Todos los campos están vacios');
			return;
		}

		if (!values.rnpa) {
			values.rnpa = '$';
		}

		if (!values.marca) {
			values.marca = '$';
		}

		if (!values.denominacionVenta) {
			values.denominacionVenta = '$';
		}

		if (!values.TipoProducto) {
			values.TipoProducto = '$';
		}

		//console.log("Received values of form: ", values);

		let resultadosBusqueda = dataProducts.filter((elemento) => {
			if (
				elemento.marca
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.includes(values.marca.toLowerCase()) ||
				elemento.TipoProducto.toLowerCase().includes(
					values.TipoProducto.toLowerCase()
				) ||
				elemento.denominacionventa
					.toLowerCase()
					.includes(values.denominacionVenta.toLowerCase()) ||
				elemento.rnpa
					.toString()
					.toLowerCase()
					.includes(values.rnpa.toLowerCase())
			) {
				return elemento;
			}
			return null;
		});
		setDataFilter(resultadosBusqueda);
	};

	const columns = [
		{
			title: 'Marca',
			dataIndex: 'marca',
			key: 'marca',
			align: 'center',
		},
		{
			title: 'Denominación Venta',
			dataIndex: 'denominacionVenta',
			key: 'denominacionVenta',
			align: 'justify',
		},
		{
			title: 'Tipo Producto',
			dataIndex: 'tipoProducto',
			key: 'tipoProducto',
			align: 'center',
		},
		{
			title: 'Estado',
			dataIndex: 'estado',
			key: 'estado',
			align: 'center',
		},
		{
			title: 'Favs',
			dataIndex: 'likes',
			key: 'likes',
			align: 'center',
			render: (_, record) => {
			  const hasLiked = record.likes.includes(userId);
			  return (
				<>
				{userId ? (
				  hasLiked ? (
					<HeartFilled onClick={() => handleLikeToggle(record)} style={{ width: '100%', color: 'red', cursor: 'pointer' }} />
				  ) : (
					<HeartOutlined onClick={() => handleLikeToggle(record)} style={{ width: '100%', color: 'red', cursor: 'pointer' }} />
				  )
				 ) : (
					<Tooltip title="Solo los usuarios registrados pueden indicar un producto como favorito">
						<HeartFilled style={{ width: '100%', color: 'red', cursor: 'not-allowed' }} />
					</Tooltip>
				)}
				  <span>{record.likes.length}</span>
				</>
			  );
			},
		  },
	];

	const onExportFileExcel = () => {
		const excel = new Excel();
		excel
			.addSheet('productos')
			.addColumns(columns)
			.addDataSource(dataFilter)
			.saveAs('Productos-Anmat.xlsx');
	};

	const paginationToTop = () => {
		window.scrollTo(0, 220);
	};

	return (
		<div className={styles.containerProducts}>
			<Form
				form={form}
				name='advanced_search'
				className={styles.searchForm}
				style={{ padding: 25 }}
				onFinish={handleSearch}
			>
				<Row gutter={24}>
					<Col span={16}>
						<Form.Item name='denominacionVenta' label='Denom. venta'>
							<Input placeholder='Ej. Yogur endulzado sabor frutilla' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name='marca' label='Marca'>
							<Input placeholder='Ej. La Serenísima' />
						</Form.Item>
					</Col>
					<Col span={16}>
						<Form.Item name='TipoProducto' label='Tipo Producto'>
							<Input placeholder='Ej. Yogures' />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name='estado' label='Estado'>
							<Select
								defaultValue='Vigente'
								options={[
									{
										label: 'Vigente',
										value: 'VIGENTE',
									},
									{
										label: 'Baja provisoria',
										value: 'BAJA PROVISORIA',
									},
								]}
							/>
						</Form.Item>
					</Col>
					<Col
						span={24}
						style={{
							textAlign: 'right',
						}}
					>
						<Button type='primary' htmlType='submit'>
							Buscar
						</Button>
						<Button
							style={{
								margin: '0 8px',
							}}
							onClick={() => {
								form.resetFields();
								setDataFilter(data);
							}}
						>
							Limpiar
						</Button>

						<Button
							style={{ backgroundColor: 'green', color: '#fff' }}
							onClick={onExportFileExcel}
						>
							Exportar
						</Button>
					</Col>
				</Row>
			</Form>

			<p className={styles.countProducts}>Cantidad de productos: {dataFilter.length}</p>

			<Table
				loading={isLoadingProducts}
				columns={columns}
				dataSource={dataFilter}
				rowKey={(record) => record._id}
				bordered
				pagination={{ position: ['bottomRight'], onChange: paginationToTop }}
			/>
		</div>
	);
};
