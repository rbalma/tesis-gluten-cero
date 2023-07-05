import React from 'react'
import { useState } from 'react';
import { Row, Col, Space, Avatar, Tabs, Tag, Dropdown, Button } from 'antd';
import {
	CheckCircleTwoTone,
	StopTwoTone,
	DeleteTwoTone,
	PlusSquareOutlined,
	MoreOutlined,
} from '@ant-design/icons';
import { DataTable, ToolBar } from '@/components/AdminDashboard';
/* import { userGetAvatar } from '@/utils/fetchData'; */
import useData from '@/hooks/useData';
import { FiltersAdminNotices } from './FiltersAdminNotices';
import { format } from 'date-fns';
import ESLocale from 'date-fns/locale/es';

const items = [
	{ label: 'Editar', key: 'item-1' },
	{ label: 'Eliminar', key: 'item-2' },
];

const pageLimit = { page: 1, limit: 20 };
//https://example.admin.refine.dev/orders?pageSize=10&current=1

export const AdminNotice = () => {
  const [filters, setFilters] = useState({ ...pageLimit, active: true });
	const [tab, setTab] = useState('1');

	const {
		1: loadingData,
		2: data,
		4: fetchData,
		5: searchInput,
		6: handleChangeSearchInput,
		7: debounceHandleSearch,
		9: countData,
	} = useData('/recipes', filters);

	const columns = [
		
		{
			title: 'Titulo',
			dataIndex: 'title',
			key: 'title',
      width: 130,
		},
		{
			title: 'Fecha de publicacion',
			dataIndex: 'date',
			key: 'date',
      width: 130,
		},
		{
			title: 'Imagen',
			dataIndex: 'image',
			key: 'image',
			width: 130,
			render: (nameFile, record) => {
				/* let url = record.dicebear;
				if (nameFile && record.google) url = nameFile;
				if (nameFile && !record.google) url = userGetAvatar(nameFile);
				return <Avatar src={url} />; */

			},
		},
		{
			title: 'Acciones',
			fixed: 'right',
			align: 'center',
			key: 'actions',
			width: 10,
			render: (_, record) => (
				<>
					<Dropdown menu={{ items }} trigger={['click']}>
						<MoreOutlined
							onClick={(e) => e.stopPropagation()}
							style={{
								fontSize: 20,
							}}
						/>
					</Dropdown>
				</>
			),
		},
	];

	const handleChangeTab = (newTab) => {
		setTab(newTab);
		if (newTab === '1') return setFilters({ ...pageLimit, active: true });
		if (newTab === '2') return setFilters({ ...pageLimit, active: false });
	};

	const props = {
		count: countData,
		columns: columns,
		loading: loadingData,
		data: data,
		fetch: setFilters,
		showHeader: true,
		perPage: filters.limit,
	};

  return (
    <>
			{/* <Row>
				<Col span={24}>
					<ToolBar
						onSearch={debounceHandleSearch}
						searchValue={searchInput}
						onChangeSearchValue={handleChangeSearchInput}
						//handleAdd={handleAdd}
					/>
				</Col>
			</Row> */}

			<Row>
				<Col
					span={17}
					offset={7}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					<h2 style={{ display: 'inline-block', marginBottom: 0 }}>Recetas</h2>
					<Button type='primary'>
						<PlusSquareOutlined />
						Agregar
					</Button>
				</Col>
			</Row>

			<Row>
				<Col span={6}><FiltersAdminNotices /></Col>
				<Col span={17} offset={1}>
					<DataTable {...props} />
				</Col>
			</Row>
		</>
  )
}
