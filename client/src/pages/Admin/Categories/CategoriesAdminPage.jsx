import { useState } from 'react';
import {
	TagNoVisible,
	TagVisible,
	getColumnSearchProps,
} from '@/components/AdminDashboard';
import {
	DrawerCategory,
	ModalDeleteCategory,
} from '@/components/AdminDashboard/CategoriesAdmin';
import { useGetCategories } from '@/services/queries/categoryQueries';
import { categoryGetImage } from '@/utils/fetchData';
import { Avatar, Space, Table } from 'antd';

import styles from '../Admin.module.css';

const columns = [
	{
		title: 'Imagen',
		dataIndex: 'image',
		width: '15%',
		align: 'center',
		render: (image) => (
			<Avatar shape='square' size={40} src={categoryGetImage(image)} />
		),
	},
	{
		title: 'Nombre',
		dataIndex: 'name',
		width: '30%',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('nombre'),
	},
	{
		title: 'Tipo',
		dataIndex: 'type',
		width: '20%',
		filters: [
			{
				text: 'Receta',
				value: 'R',
			},
			{
				text: 'Mapa',
				value: 'M',
			},
		],
		filterMultiple: false,
		render: (type) => {
			if (type === 'R') return 'Receta';
			if (type === 'M') return 'Mapa';
		},
	},
	{
		title: 'Estado',
		dataIndex: 'visible',
		width: '20%',
		filters: [
			{
				text: 'Visible',
				value: '1',
			},
			{
				text: 'No Visible',
				value: '0',
			},
		],
		filterMultiple: false,
		render: (visible) => (+visible === 1 ? <TagVisible /> : <TagNoVisible />),
	},
	{
		title: '',
		fixed: 'right',
		width: '15%',
		render: (_, record) => (
			<Space size={24}>
				<DrawerCategory categoryId={record._id} />
				<ModalDeleteCategory
					categoryId={record._id}
					categoryName={record.name}
				/>
			</Space>
		),
	},
];

export const CategoriesAdminPage = () => {
	const [tableParams, setTableParams] = useState({
		page: 1,
		limit: 15,
	});
	const { isFetching, data } = useGetCategories(tableParams);

	const handleTableChange = (_, filters, sorter) => {
		const filtersQuery = {
			page: 1,
			limit: 15,
		};

		if (sorter?.order) {
			filtersQuery.sortField = sorter.field;
			filtersQuery.sortOrder = sorter.order === 'descend' ? 'desc' : 'asc';
		} else {
			filtersQuery.sortField = undefined;
			filtersQuery.sortOrder = undefined;
		}

		Object.entries(filters).forEach(([key, value]) => {
			if (value?.[0]) filtersQuery[key] = value[0];
		});

		setTableParams(filtersQuery);
	};

	return (
		<>
			<header className={styles.headerBody}>
				<h1>Categorías</h1>
				<DrawerCategory />
			</header>

			<Table
				loading={isFetching}
				columns={columns}
				dataSource={data}
				pagination={false}
				locale={{ emptyText: 'Sin Datos', filterReset: 'Borrar' }}
				rowKey={(record) => `${record._id}`}
				onChange={handleTableChange}
			/>
		</>
	);
};
