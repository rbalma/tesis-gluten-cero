import { useEffect, useState } from 'react';
import { Table, Form, Input, message, Select, Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { Excel } from 'antd-table-saveas-excel';
import { SearchIcon } from '@/components/Icons';
import useData from '@/hooks/useData';

import styles from './ProductsPage.module.css';

// https://eddieup.github.io/antd-table-saveas-excel/2api
// https://github.com/webstylepress/Fetch-Data-from-XLSX-Excel-File-in-React-JS/blob/main/src/App.js

const columns = [
	{
		title: 'Nombre del Producto',
		dataIndex: 'denominacionVenta',
		key: 'denominacionVenta',
		width: '50%',
		render: (text) => <span className={styles.rowLowercase}>{text}</span>,
	},
	{
		title: 'Tipo de Producto',
		dataIndex: 'tipoProducto',
		key: 'tipoProducto',
		width: '25%',
		render: (text) => <span className={styles.rowLowercase}>{text}</span>,
	},
	{
		title: 'Marca',
		dataIndex: 'marca',
		key: 'marca',
		width: '15%',
		render: (text) => <span className={styles.rowLowercase}>{text}</span>,
	},
	{
		title: 'Estado',
		dataIndex: 'estado',
		key: 'estado',
		align: 'center',
		width: '10%',
		render: (text) => <span className={styles.rowLowercase}>{text}</span>,
	},
];

export const ProductsPage = () => {
	const [dataFilter, setDataFilter] = useState([]);

	const [form] = Form.useForm();
	const { 1: isLoadingProducts, 2: dataProducts } = useData('/products');

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

	const onFinish = (values) => {
		console.log({ values });
	};

	return (
		<div className={styles.containerProducts}>
			<section className={styles.bannerSection}>
				<div className={styles.titlesGroup}>
					<h2>Productos Sin Tacc</h2>
					<h4>Explora el listado de productos aprobados por la ANMAT</h4>
					<Form onFinish={onFinish}>
						<div className={styles.mainSearchInput}>
							<div className={styles.searchInputName}>
								<Form.Item name='denominacion' noStyle>
									<Input
										bordered={false}
										placeholder='¿Qué producto estás buscando?'
									/>
								</Form.Item>
							</div>
							<div className={styles.searchInputProductType}>
								<Form.Item name='tipo' noStyle>
									<Select
										bordered={false}
										allowClear
										className={styles.searchSelect}
										placeholder='Tipo de producto'
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
							</div>
							<div className={styles.searchInputBrand}>
								<Form.Item name='marca' noStyle>
									<Input bordered={false} placeholder='Todas las marcas' />
								</Form.Item>
							</div>
							<button type='submit' className={styles.btnSearch}>
								<SearchIcon />
							</button>
						</div>
					</Form>
				</div>
			</section>

			<div className={styles.totalExports}>
				<span>Total de Productos: {dataFilter.length}</span>
				<div className={styles.exportSort}>
					<div>
						Ordenar por:
						<Select
							defaultValue='product'
							bordered={false}
							dropdownStyle={{ minWidth: 130 }}
							placement='bottomLeft'
							options={[
								{
									value: 'product',
									label: 'Producto',
								},
								{
									value: 'brand',
									label: 'Marca',
								},
								{
									value: 'fav',
									label: 'Favoritos',
								},
							]}
						/>
					</div>
					<Button
						icon={<FileExcelOutlined />}
						shape='round'
						size='small'
						style={{ backgroundColor: 'transparent' }}
						danger>
						Exportar Productos
					</Button>
				</div>
			</div>

			<div className={styles.tableContainer}>
				<Table
					loading={isLoadingProducts}
					columns={columns}
					dataSource={dataFilter}
					rowKey={(record) => record.id}
					bordered
					pagination={{ position: ['bottomRight'], onChange: paginationToTop }}
				/>
			</div>
		</div>
	);
};
