import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Dropdown, Button } from 'antd';
import {
	PlusSquareOutlined,
	MoreOutlined,
} from '@ant-design/icons';
import { DataTable } from '@/components/AdminDashboard';
import useData from '@/hooks/useData';
import { FiltersAdminNotices } from './FiltersAdminNotices';
import { format } from 'date-fns';
import ESLocale from 'date-fns/locale/es';
import './AdminNotice.css';

const pageLimit = { page: 1, limit: 20 };

export const AdminNotice = () => {

	const token = localStorage.getItem('token');

	const navigate = useNavigate();

  	const [filters, setFilters] = useState({ ...pageLimit, active: true });

	const {
		1: loadingData,
		2: data, 
		// 4: fetchData,
		// 5: searchInput,
		// 6: handleChangeSearchInput,
		// 7: debounceHandleSearch,
		9: countData,
	} = useData('/notices', filters);

	const dataTableColumns = [
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
			render: (v) => {
				if (v) return	format(new Date(v), 'PPPp', { locale: ESLocale });
				return ''
			},
		},
		{
			title: 'Fuente',
			dataIndex: 'source',
			key: 'source',
      		width: 130,
		},
		{
			title: 'Link',
			dataIndex: 'link',
			key: 'link',
      		width: 130,
			render: (link) => {
				if (link) return <a href={link} rel='noreferrer' target="_blank">{link}</a>
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

	const [noticesCopy, setNoticesCopy] = useState(data)

	const [props, setProps] = useState({
		count: countData,
		columns: dataTableColumns,
		loading: loadingData,
		data: data,
		fetch: setFilters,
		showHeader: true,
		perPage: filters.limit,
	})

	const applyFilters = (title, dates, orderBy) => {
		console.log('prueba')
		// let filteredNotices = [...data]; 
		let filteredNotices = [...noticesCopy]; 

		// Filtra por el titulo
		if(title.length > 0) {
			const filteredNoticesByTitle = filteredNotices?.filter((notice) =>
				notice.title.toLowerCase().includes(title.toLowerCase())
			);
			filteredNotices = filteredNoticesByTitle;
		};
		
		// Filtra por la fecha
		if(dates[0].length > 0 && dates[1].length) {
			const desde = new Date(dates[0]);
			const hasta = new Date(dates[1]);

			const filteredNoticesByDate = filteredNotices.filter((notice) => {
				const fechaNoticia = new Date(notice.date);
				return fechaNoticia >= desde && fechaNoticia <= hasta;
			});
			filteredNotices = filteredNoticesByDate;
		};

		// Ordena por fecha recientes
		if(orderBy === 'recientes') {
			const filteredNoticesCopy = filteredNotices;
			filteredNoticesCopy.sort((noticeA, noticeB) => {
				const dateA = new Date(noticeA.date);
				const dateB = new Date(noticeB.date);

				return dateB - dateA;
			});
		};

		// Ordena por fecha antiguos
		if(orderBy === 'antiguos') {
			const filteredNoticesCopy = filteredNotices;
			filteredNoticesCopy.sort((noticeA, noticeB) => {
				const dateA = new Date(noticeA.date);
				const dateB = new Date(noticeB.date);

				return dateA - dateB;
			});
			filteredNotices = filteredNoticesCopy;
		};

		setProps({
			count: countData,
			columns: dataTableColumns,
			loading: loadingData,
			data: filteredNotices,
			fetch: setFilters,
			showHeader: true,
			perPage: filters.limit,
		})
	};

	useEffect(() => {
		if(!loadingData) {
			setProps({
				...props,
				count: countData,
				columns: dataTableColumns,
				loading: loadingData,
				data: data,
			})
			setNoticesCopy(data);
		};
	}, [data]);

	const removeNotice = (id) => {
		setProps(prevProps => {
			const updatedNotices = prevProps.data.filter(notice => notice._id !== id);
			return {
			...prevProps,
			data: updatedNotices,
			};
		});

		setNoticesCopy(prevNoticesCopy => {
			const updatedNotices = prevNoticesCopy.filter(notice => notice._id !== id);
			return updatedNotices;
		});
	};

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
				
				removeNotice(item.props.id);
			} catch(error) {
				console.log(error);
			};
		}
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
				<h2 style={{ display: 'inline-block', marginBottom: 0 }}>Noticias</h2>
				<Button type='primary' onClick={()=>navigate('agregar')}>
					<PlusSquareOutlined />
					Agregar
				</Button>
			</Col>
		</Row>

		<Row>
			<Col span={6}><FiltersAdminNotices applyFilters={applyFilters}/></Col>
			<Col span={17} offset={1}>
				<DataTable {...props} />
			</Col>
		</Row>
	</>
  );
};
