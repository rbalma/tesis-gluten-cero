import { useState } from 'react';
import { Avatar, Space, Table, Button } from 'antd';
import {
	getColumnSearchProps,
  	TagStateThread,
} from '@/components/AdminDashboard';
import { userGetAvatar } from '@/utils/fetchData';
import { dateLongFormat } from '@/utils/format';
import { useGetThreads } from '@/services/queries/forumQueries';
import { DrawerDetailThreads,ModalDeletePost} from '@/components/AdminDashboard/ForumAdmin';
import { IconCirclePlus } from '@/components/Icons';
import { useNavigate } from 'react-router-dom';
import {IconHeartFilled} from '@/components/Icons';

import styles from '../Admin.module.css';

const expandedRowRender = (thread) => {

  const postColumns = [
    {
      title: 'Usuario Respuesta',
      dataIndex: 'user',
      width: '15%',
      showSorterTooltip: false,
      ...getColumnSearchProps('nombre'),
      render: (_, record) => `${record.user?.name} ${record.user?.lastname}`,
    },
    {
      title: 'Contenido',
      dataIndex: 'content',
      width: '55%',
      sorter: true,
      showSorterTooltip: false,
      ...getColumnSearchProps('content'),
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'date',
      width: '15%',
      sorter: true,
      showSorterTooltip: false,
      render: (date) => dateLongFormat(date),
    },
	{
		title: '',
		fixed: 'right',
		width: '5%',
		render: (_, record) => (
			<Space size={24}>
				<ModalDeletePost
					postId={record._id}
				/>
			</Space>
		),
	},
  ];

  return (
    <Table
      columns={postColumns}
      dataSource={thread.posts}
      pagination={false}
      rowKey={(post) => post._id}
    />
  );
}

const columns = [
	{
		title: 'Avatar',
		dataIndex: 'user',
		width: '5%',
		align: 'center',
		render: (_, record) => (
			<Avatar
				size={40}
				shape='circle'
				alt='avatar'
				src={userGetAvatar(`${record.user?.avatar}`)}
			/>
		),
	},
  {
		title: 'Usuario Creador',
		dataIndex: 'user',
		width: '18%',
		showSorterTooltip: false,
		...getColumnSearchProps('nombre'),
		render: (_, record) => `${record.user?.name} ${record.user?.lastname}`,
	},
	{
		title: 'Titulo',
		dataIndex: 'title',
		width: '45%',
		sorter: true,
		showSorterTooltip: false,
		...getColumnSearchProps('title'),
	},
	{
		title: 'Rtas',
		width: '4%',
		sorter: (a, b) => a.posts.length - b.posts.length,
		render: (_, record) => `${record.posts.length}`,
	},
  	{
		title: 'Estado',
		dataIndex: 'status',
		width: '5%',
		filters: [
			{
				text: 'Abierto',
				value: 'open',
			},
			{
				text: 'Cerrado',
				value: 'closed',
			},
		],
		filterMultiple: false,
		render: (state) => <TagStateThread state={state} />,
	},
	{
		title: 'Fav',
		width: '4%',
		sorter: (a, b) => a.likes.length - b.likes.length,
		render: (_, record) => (
			<Space >
				<span>
					<IconHeartFilled/>
				</span>
				<span>{record.likes.length}</span>
			</Space>
		),
	},
	{
	  title: 'Fecha Creación',
	  dataIndex: 'date',
	  width: '15%',
	  sorter: true,
	  showSorterTooltip: false,
	  render: (date) => dateLongFormat(date),
  	},
  	{
		title: '',
		fixed: 'right',
		width: '5%',
		render: (_, record) => (
			<Space size={24}>
				<DrawerDetailThreads threadId={record._id} />
			</Space>
		),
	},
];

export const ThreadsAdminPage = () => {
	const navigate = useNavigate();

	const [tableParams, setTableParams] = useState({
		page: 1,
		limit: 10,
	});
	const { isFetching, data } = useGetThreads(tableParams);

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
				<h1>Hilos</h1>
				<Button
					className='iconBtn'
					type='primary'
					icon={<IconCirclePlus size={18} />}
					onClick={() => navigate('/foro-formulario')}>
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
        expandable={{
          expandedRowRender,
        }}
				onChange={handleTableChange}
			/>
		</>
	);
};