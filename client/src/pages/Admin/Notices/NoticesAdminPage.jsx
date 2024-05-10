import { useState } from 'react';
import { Space, Table } from 'antd';
import {
	TagNoVisible,
	TagVisible,
	getColumnSearchProps,
} from '@/components/AdminDashboard';
import { useGetNotices } from '@/services/queries/noticeQueries';
import { noticeGetImage } from '@/utils/fetchData';
import { timeAgo } from '@/utils/format';
import {
	DrawerDetailNotices,
	DrawerFormNotices,
} from '@/components/AdminDashboard/NoticesAdmin';

import styles from '../Admin.module.css';

const columns = [
	{
		title: 'Imagen',
		dataIndex: 'image',
		width: '15%',
		align: 'center',
		render: (image) => (
			<img width={80} height={45} src={noticeGetImage(image)} />
		),
	},
	{
		title: 'Título',
		dataIndex: 'title',
		width: '32%',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('título'),
	},
	{
		title: 'Fuente',
		dataIndex: 'source',
		width: '15%',
		sorter: true,
		...getColumnSearchProps('fuente'),
		render: (source, record) => (
			<a href={record.link} target='_blank'>
				{source}
			</a>
		),
	},
	{
		title: 'Publicada',
		dataIndex: 'date',
		width: '15%',
		sorter: true,
		render: (date) => timeAgo(date),
	},
	{
		title: 'Estado',
		dataIndex: 'visible',
		width: '15%',
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
		width: '8%',
		render: (_, record) => (
			<Space size={24}>
				<DrawerDetailNotices noticeId={record._id} />
			</Space>
		),
	},
];

export const NoticesAdminPage = () => {
	const [tableParams, setTableParams] = useState({
		page: 1,
		limit: 15,
	});
	const { isFetching, data } = useGetNotices(tableParams);

	const handleTableChange = (pagination, filters, sorter) => {
		const filtersQuery = {
			page: pagination.current || 1,
			limit: pagination.pageSize || 15,
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
				<h1>Noticias</h1>
				<DrawerFormNotices />
			</header>

			<Table
				loading={isFetching}
				columns={columns}
				dataSource={data?.notices}
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
