import { useState } from 'react';
import { Avatar, Space, Table } from 'antd';
import {
	TagNoVisible,
	TagVisible,
	getColumnSearchProps,
} from '@/components/AdminDashboard';
import { userGetAvatar } from '@/utils/fetchData';
import { dateLongFormat } from '@/utils/format';
import { useGetUsers } from '@/services/queries/usersQueries';
import { DrawerDetailUsers, DrawerFormUsers } from '@/components/AdminDashboard/UsersAdmin';

import styles from '../Admin.module.css';

const columns = [
	{
		title: 'Avatar',
		dataIndex: 'avatar',
		width: '5%',
		align: 'center',
		render: (avatar) => (
			<Avatar
				size={40}
				shape='circle'
				alt='avatar'
				src={userGetAvatar(avatar)}
			/>
		),
	},
	{
		title: 'Nombre',
		dataIndex: 'name',
		width: '15%',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('nombre'),
	},
	{
		title: 'Apellido',
		dataIndex: 'lastname',
		width: '15%',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('apellido'),
	},
	{
		title: 'Correo',
		dataIndex: 'email',
		width: '25%',
		...getColumnSearchProps('correo'),
	},
	{
		title: 'Fecha Creación',
		dataIndex: 'createdAt',
		width: '20%',
		sorter: true,
		showSorterTooltip: false,
		render: (date) => dateLongFormat(date),
	},
	{
		title: 'Estado',
		dataIndex: 'active',
		width: '10%',
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
			+visible === 1 ? <TagVisible isUser /> : <TagNoVisible isUser />,
	},
	{
		title: '',
		fixed: 'right',
		width: '8%',
		render: (_, record) => (
			<Space size={24}>
				<DrawerDetailUsers userId={record._id} />
			</Space>
		),
	},
];

export const UsersAdminPage = () => {
	const [tableParams, setTableParams] = useState({
		page: 1,
		limit: 10,
		role: 'user'
	});
	const { isFetching, data } = useGetUsers(tableParams);

	const handleTableChange = (pagination, filters, sorter) => {
		const filtersQuery = {
			page: pagination.current || 1,
			limit: pagination.pageSize || 10,
			role: 'user'
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
				<h1>Usuarios</h1>
				<DrawerFormUsers />
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
