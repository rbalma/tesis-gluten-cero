import { useState } from 'react';
import { Avatar, Button, Space, Table } from 'antd';
import {
	TagStateRecipe,
	getColumnSearchProps,
} from '@/components/AdminDashboard';
import { dateLongFormat } from '@/utils/format';
import { DrawerDetailRecipes } from '@/components/AdminDashboard/RecipesAdmin';
import { useNavigate } from 'react-router-dom';
import { IconCirclePlus } from '@/components/Icons';
import { useGetRecipes } from '@/services/queries/recipeQueries';

import styles from '../Admin.module.css';

const columns = [
	{
		title: 'Foto',
		dataIndex: ['image', 'secure_url'],
		width: '5%',
		align: 'center',
		render: (picture) => (
			<Avatar size={50} shape='square' alt='marker' src={picture} />
		),
	},
	{
		title: 'Título',
		dataIndex: 'title',
		width: '20%',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('nombre'),
	},
	{
		title: 'Categoría',
		dataIndex: ['category', 'name'],
		width: '15%',
		...getColumnSearchProps('categoría'),
	},
	{
		title: 'Usuario Creador',
		dataIndex: 'user',
		width: '20%',
		showSorterTooltip: false,
		...getColumnSearchProps('nombre'),
		render: (_, record) => `${record.user?.name} ${record.user?.lastname}`,
	},
	{
		title: 'Fecha Creación',
		dataIndex: 'createdAt',
		width: '18%',
		sorter: true,
		showSorterTooltip: false,
		render: (date) => dateLongFormat(date),
	},
	{
		title: 'Estado',
		dataIndex: 'state',
		width: '5%',
		filters: [
			{
				text: 'Aprobada',
				value: 'success',
			},
			{
				text: 'Pendiente',
				value: 'pending',
			},
			{
				text: 'Rechazada',
				value: 'error',
			},
		],
		filterMultiple: false,
		render: (state) => <TagStateRecipe state={state} />,
	},
	{
		title: '',
		fixed: 'right',
		width: '8%',
		render: (_, record) => (
			<Space size={24}>
				<DrawerDetailRecipes recipeId={record._id} />
			</Space>
		),
	},
];

export const RecipesAdminPage = () => {
	const navigate = useNavigate();
	const [tableParams, setTableParams] = useState({
		page: 1,
		limit: 10,
	});
	const { isFetching, data } = useGetRecipes(tableParams);

	const handleTableChange = (pagination, filters, sorter) => {
		const filtersQuery = {
			page: pagination.current || 1,
			limit: pagination.pageSize || 10,
			role: 'user',
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
				<h1>Recetas</h1>
				<Button
					className='iconBtn'
					type='primary'
					icon={<IconCirclePlus size={18} />}
					onClick={() => navigate('/receta-formulario')}>
					Agregar
				</Button>
			</header>

			<Table
				loading={isFetching}
				columns={columns}
				dataSource={data?.data}
				pagination={{
					pageSize: tableParams.limit,
					current: tableParams.page,
					total: data?.totalPages,
					hideOnSinglePage: true,
				}}
				locale={{ emptyText: 'Sin Datos', filterReset: 'Borrar' }}
				rowKey={(record) => `${record._id}`}
				onChange={handleTableChange}
			/>
		</>
	);
};
