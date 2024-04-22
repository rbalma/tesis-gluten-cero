import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Dropdown, Button } from 'antd';
import {
	PlusSquareOutlined,
	MoreOutlined,
} from '@ant-design/icons';
import { DataTable } from '@/components/AdminDashboard';
import useData from '@/hooks/useData';
import { FiltersAdminCategories } from './FiltersAdminCategories';
import '../Notices/AdminNotice.css';

const pageLimit = { page: 1, limit: 20 };

export const AdminCategories = () => {

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
	} = useData('/categories', filters);

	const dataTableColumns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
      		width: 130,
		},
		{
			title: 'Descripción',
			dataIndex: 'description',
			key: 'description',
      		width: 130,
		},
		{
			title: 'Imagen',
			dataIndex: 'avatar',
			key: 'avatar',
			width: 130,
			render: (avatar) => {
				if(avatar !== undefined) {
					const bufferArray = avatar.data.data;
				
					const buffer = Uint8Array.from(bufferArray);
	
					const blob = new Blob([buffer], { type: avatar.contentType });
	
					const imageUrl = URL.createObjectURL(blob);
					
					return <img 
						className='notice-image'
						src={imageUrl}
						alt='Imagen noticia'
					/>;
				} else {
					return <p>Sin imagen</p>
				}
			},
		},
    {
			title: 'Tipo',
			dataIndex: 'type',
			key: 'type',
      		width: 130,
		},
		{
			title: 'Acciones',
			fixed: 'right',
			align: 'center',
			key: 'actions',
			width: 10,
			render: (category) => {
				const items = [
					{ label: 'Editar', key: 'editar', id: category._id },
					{ label: 'Eliminar', key: 'eliminar', id: category._id },
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

	const [categoriesCopy, setCategoriesCopy] = useState(data)

	const [props, setProps] = useState({
		count: countData,
		columns: dataTableColumns,
		loading: loadingData,
		data: data,
		fetch: setFilters,
		showHeader: true,
		perPage: filters.limit,
	})

	const applyFilters = (name, type) => {
		let filteredCategories = [...categoriesCopy]; 

		// Filtra por el nombre
		if(name.length > 0) {
			const filteredCategoriesByName = filteredCategories?.filter((category) =>
				category.name.toLowerCase().includes(name.toLowerCase())
			);
			filteredCategories = filteredCategoriesByName;
		};

		// Filtra por tipo
		if(type !== 'Todas') {
			const filteredCategoriesByType = filteredCategories?.filter((category) => category.type === type);
			filteredCategories = filteredCategoriesByType;
		};


		setProps({
			count: countData,
			columns: dataTableColumns,
			loading: loadingData,
			data: filteredCategories,
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
			setCategoriesCopy(data);
		};
	}, [data]);

	const removeCategory = (id) => {
		setProps(prevProps => {
			const updatedCategories = prevProps.data.filter(category => category._id !== id);
			return {
			...prevProps,
			data: updatedCategories,
			};
		});

		setCategoriesCopy(prevNoticesCopy => {
			const updatedCategories = prevNoticesCopy.filter(category => category._id !== id);
			return updatedCategories;
		});
	};

	const onClick = async ({ item, key }) => {
		if (key === 'editar') {
			navigate(`editar/${item.props.id}`)
		} else {
			// Delete Notice
			try {
				await fetch(`http://localhost:5000/api/categories/${item.props.id}`, {
					method: 'DELETE',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				});
				
				removeCategory(item.props.id);
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
				<h2 style={{ display: 'inline-block', marginBottom: 0 }}>Categorias</h2>
				<Button type='primary' onClick={()=>navigate('agregar')}>
					<PlusSquareOutlined />
					Agregar
				</Button>
			</Col>
		</Row>

		<Row>
			<Col span={6}><FiltersAdminCategories applyFilters={applyFilters}/></Col>
			<Col span={17} offset={1}>
				<DataTable {...props} />
			</Col>
		</Row>
	</>
  );
};