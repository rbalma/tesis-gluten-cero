import { useReducer } from 'react';
import { Table, Form } from 'antd';
import {
	ExportsProducts,
	CleanFiltersProducts,
	SortProducts,
	SearchBarProducts,
	LikeProducts,
} from '@/components/Products';
import { useGetProducts } from '@/services/queries/productsQueries';

import styles from './ProductsPage.module.css';

export const ProductsPage = () => {
	const [form] = Form.useForm();
	const [filters, setFilters] = useReducer(
		(current, update) => ({ ...current, ...update }),
		{
			limit: 50,
			page: 1,
			sortField: 'denominacionVenta',
		}
	);
	const { isFetching, data } = useGetProducts(filters);

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
			title: 'Favoritos',
			dataIndex: 'likesCount',
			key: 'likesCount',
			width: '10%',
			align: 'center',
			render: (count, record) => (
				<LikeProducts filters={filters} count={count} productId={record._id} />
			),
		},
	];

	const cleanFilters = () => {
		form.resetFields();
		setFilters({
			limit: 50,
			page: 1,
			sortField: 'denominacionVenta',
			name: '',
			type: '',
			brand: '',
		});
	};

	const handleChangePagination = (page, pageSize) => {
		setFilters({
			page,
			limit: pageSize,
		});
	};

	const handleChangeSort = (value) => {
		setFilters({
			sortField: value,
			page: 1
		});
	};

	const onFinishSearch = (values) => {
		const { name = '', type = '', brand = '' } = values;
		if (!name && !type && !brand) return;
		setFilters({
			type,
			name: name.trim().toUpperCase(),
			brand: brand.trim().toUpperCase(),
			page: 1
		});
	};

	return (
		<div className={styles.containerProducts}>
			<section className={styles.bannerSection}>
				<div className={styles.titlesGroup}>
					<h2>Productos Sin Tacc</h2>
					<h4>Explora el listado de productos aprobados por la ANMAT</h4>
					<Form onFinish={onFinishSearch} form={form}>
						<SearchBarProducts />
					</Form>
				</div>
			</section>

			<div className={styles.totalExports}>
				<div>
					<span className={styles.totalProducts}>{data?.count} Productos</span>{' '}
					<CleanFiltersProducts filters={filters} cleanFilters={cleanFilters} />
				</div>
				<div className={styles.exportSort}>
					<SortProducts handleChange={handleChangeSort} />
					<ExportsProducts filters={filters} />
				</div>
			</div>

			<div className={styles.tableContainer}>
				<Table
					loading={isFetching}
					columns={columns}
					dataSource={data?.products}
					rowKey={(record) => record._id}
					bordered
					scroll={{
						y: 'calc(100dvh - 200px)',
					}}
					pagination={{
						position: ['bottomRight'],
						onChange: handleChangePagination,
						pageSize: filters.limit,
						current: filters.pageSize,
						size: 'small',
						hideOnSinglePage: true,
						total: data?.count,
						showQuickJumper: true,
						locale: {
							items_per_page: '/ página',
							prev_page: 'Página anterior',
							next_page: 'Página siguiente',
							prev_5: '5 páginas previas',
							next_5: '5 páginas siguientes',
							jump_to: 'Ir a',
							jump_to_confirm: 'confirmar',
							page: 'Página',
						},
					}}
				/>
			</div>
		</div>
	);
};
