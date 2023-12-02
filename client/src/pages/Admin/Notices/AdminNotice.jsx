import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Row, Col, Dropdown, Button } from 'antd';
import {
	PlusSquareOutlined,
	MoreOutlined,
} from '@ant-design/icons';
import { DataTable } from '@/components/AdminDashboard';
/* import { userGetAvatar } from '@/utils/fetchData'; */
import useData from '@/hooks/useData';
import { FiltersAdminNotices } from './FiltersAdminNotices';
import { format } from 'date-fns';
import ESLocale from 'date-fns/locale/es';
import './AdminNotice.css';

// const items = [
// 	{ label: 'Editar', key: 'editar', id: 'id' },
// 	{ label: 'Eliminar', key: 'eliminar' },
// ];

const pageLimit = { page: 1, limit: 20 };
// https://example.admin.refine.dev/orders?pageSize=10&current=1

export const AdminNotice = () => {

	const token = localStorage.getItem('token');

	const navigate = useNavigate();

  	const [filters, setFilters] = useState({ ...pageLimit, active: true });
	// const [tab, setTab] = useState('1');

	const {
		1: loadingData,
		2: data, 
		// 4: fetchData,
		// 5: searchInput,
		// 6: handleChangeSearchInput,
		// 7: debounceHandleSearch,
		9: countData,
	} = useData('/notices', filters);

	const onClick = async ({ item, key }) => {
		if (key === 'editar') {
			navigate(`editar/${item.props.id}`)
		} else {
			// Delete Notice
			try {
				await fetch(`http://localhost:5000/api/notices/${item.props.id}`, {
					method: 'DELETE',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				});
			} catch(error) {
				console.log(error);
			};
		}
	};

	const columns = [
		{
			title: 'Titulo',
			dataIndex: 'title',
			key: 'title',
      		width: 130,
		},
		{
			title: 'Link',
			dataIndex: 'link',
			key: 'link',
      		width: 130,
		},
		{
			title: 'Fecha de publicacion',
			dataIndex: 'date',
			key: 'date',
			render: (v) => {
				if (v) return	format(new Date(v), 'PPPp', { locale: ESLocale });
				return ''
			},
		},
		{
			title: 'Imagen',
			dataIndex: 'avatar',
			key: 'avatar',
			width: 130,
			render: (avatar) => {
				const bufferArray = avatar.data.data;
				
				const buffer = Uint8Array.from(bufferArray);

				const blob = new Blob([buffer], { type: avatar.contentType });

				const imageUrl = URL.createObjectURL(blob);
				
				return <img 
					className='notice-image'
					src={imageUrl}
					alt='Imagen noticia'
				/>;
				// return <h1>hola</h1>

			},
		},
		{
			title: 'Acciones',
			fixed: 'right',
			align: 'center',
			key: 'actions',
			width: 10,
			render: (notice) => {
				const items = [
					{ label: 'Editar', key: 'editar', id: notice._id },
					{ label: 'Eliminar', key: 'eliminar', id: notice._id },
				];
				return(
					<>
						<Dropdown menu={{ items, onClick }} trigger={['click']}>
							<MoreOutlined
								onClick={(e) => {
									e.stopPropagation()
								}}
								style={{
									fontSize: 20,
								}}
							/>
						</Dropdown>
					</>
				)
			},
		},
	];

	// const handleChangeTab = (newTab) => {
	// 	setTab(newTab);
	// 	if (newTab === '1') return setFilters({ ...pageLimit, active: true });
	// 	if (newTab === '2') return setFilters({ ...pageLimit, active: false });
	// };

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
				<Button type='primary' onClick={()=>navigate('agregar')}>
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
  );
};
