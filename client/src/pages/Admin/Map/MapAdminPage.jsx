import { useState } from 'react';
import { Avatar, Button, Space, Table } from 'antd';
import {
	TagNoVisible,
	TagVisible,
	getColumnSearchProps,
} from '@/components/AdminDashboard';
import { dateLongFormat } from '@/utils/format';
import { useGetMarkers } from '@/services/queries/mapQueries';
import {
	DrawerDetailUsers,
	DrawerFormUsers,
} from '@/components/AdminDashboard/UsersAdmin';

import styles from '../Admin.module.css';
import { IconCirclePlus } from '@/components/Icons';
import { useNavigate } from 'react-router-dom';
import { DrawerDetailMarkers } from '@/components/AdminDashboard/MarkersAdmin/DrawerDetailMarkers';

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
		title: 'Nombre',
		dataIndex: 'name',
		width: '20%',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('nombre'),
	},
	{
		title: 'Dirección',
		dataIndex: 'direction',
		width: '25%',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('dirección'),
	},
	{
		title: 'Categoría',
		dataIndex: ['category', 'name'],
		width: '12%',
		filters: [
			{
				text: 'Comercio',
				value: '6632c1f9ec23c10550705832',
			},
			{
				text: 'Hospital',
				value: '6632c07ec816800bc169a777',
			},
			{
				text: 'Restaurante',
				value: '6632c209ec23c10550705835',
			},
		],
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
		dataIndex: 'active',
		width: '8%',
		filters: [
			{
				text: 'Activos',
				value: '1',
			},
			{
				text: 'Inactivos',
				value: '0',
			},
		],
		filterMultiple: false,
		render: (visible) =>
			+visible === 1 ? <TagVisible /> : <TagNoVisible />,
	},
	{
		title: '',
		fixed: 'right',
		width: '5%',
		render: (_, record) => (
			<Space size={24}>
				<DrawerDetailMarkers markerId={record._id} />
			</Space>
		),
	},
];

export const MapAdminPage = () => {
	const navigate = useNavigate();
	const [tableParams, setTableParams] = useState({
		page: 1,
		limit: 10,
	});
	const { isFetching, data } = useGetMarkers(tableParams);

	const handleTableChange = (pagination, filters, sorter) => {
		const filtersQuery = {
			page: pagination.current || 1,
			limit: pagination.pageSize || 10,
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
				<h1>Marcadores</h1>
				<Button
					className='iconBtn'
					type='primary'
					icon={<IconCirclePlus size={18} />}
					onClick={() => navigate('/mapa-formulario')}>
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
