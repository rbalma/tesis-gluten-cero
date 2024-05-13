import { useEffect, useState } from 'react';
import { Table, Form, Row, Col, Input, Button, message, Select } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import useData from '@/hooks/useData';

import styles from './ProductsPage.module.css';

// https://eddieup.github.io/antd-table-saveas-excel/2api
// https://github.com/webstylepress/Fetch-Data-from-XLSX-Excel-File-in-React-JS/blob/main/src/App.js

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
];

export const ProductsPage = () => {
	const [dataFilter, setDataFilter] = useState([]);

	const [form] = Form.useForm();
	const {
		1: isLoadingProducts,
		2: dataProducts
	} = useData('/products-anmat');

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
				rowKey={(record) => record.id}
				bordered
				pagination={{ position: ['bottomRight'], onChange: paginationToTop }}
			/>
		</div>
	);
};
