import { useState } from 'react';
import {
	TagNoVisible,
	TagVisible,
	getColumnSearchProps,
} from '@/components/AdminDashboard';
import { DrawerCategory, ModalDeleteCategory } from '@/components/AdminDashboard/CategoriesAdmin';
import { useGetCategories } from '@/services/queries/categoryQueries';
import { categoryGetImage } from '@/utils/fetchData';
import { Avatar, Space, Table } from 'antd';

import styles from '../Admin.module.css';

const columns = [
	{
		title: 'Imagen',
		dataIndex: 'image',
		width: 100,
		align: 'center',
		render: (image) => (
			<Avatar shape='square' size={40} src={categoryGetImage(image)} />
		),
	},
	{
		title: 'Nombre',
		dataIndex: 'name',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('nombre'),
	},
	{
		title: 'Tipo',
		dataIndex: 'type',
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
	const { isFetching, data } = useGetCategories();

	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
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
