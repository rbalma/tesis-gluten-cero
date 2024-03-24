import { Button, Form, Input, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

import styles from './FiltersAdminUser.module.css';

const { RangePicker } = DatePicker;

export const FiltersAdminUser = (props) => {

	const { applyFilters } = props;

	const [filters, setFilters] = useState({
		name: '',
		state:null,
		dates: ['', ''],
		orderBy: ''
	});

	const handleNameChange = (event) => {
        setFilters({
            ...filters,
            name: event.target.value
        });
    };

	const handleStateChange = (value) => {
		setFilters({
            ...filters,
            state: value
        });
    };

	const handleDateChange = (_, dateString) => {
		setFilters({
            ...filters,
            dates: dateString
        });
    };

	const handleOrderByChange = (value) => {
		setFilters({
            ...filters,
            orderBy: value
        });
    };

	const handleFilters = (v) => {
		console.log({ v });
		applyFilters(filters.name, filters.state, filters.dates, filters.orderBy);
	};

	return (
		<div className={styles.formFilter}>
			<h1>Filtros</h1>
			<hr />

			<Form
				layout='vertical'
				onFinish={handleFilters}
				requiredMark={false}
				validateTrigger='onSubmit'
				autoComplete='off'
			>
				<Form.Item label='Buscar' name='email'>
					<Input
						placeholder='Nombre, apellido, correo...'
						prefix={<SearchOutlined />}
						onChange={handleNameChange}
					/>
				</Form.Item>

				<Form.Item label='Estado' name='active'>
					<Select placeholder='Estado del usuario' 
					onChange={handleStateChange} 
					options={[
						{
						  value: null,
						  label: 'Todos',
						},
						{
						  value: true,
						  label: 'Activo',
						},
						{
						  value: false,
						  label: 'Inactivo',
						}
					]}/>
				</Form.Item>

				<Form.Item label='Fecha de creación' name='active'>
					<RangePicker placeholder={['Desde','Hasta']} onChange={handleDateChange} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item label='Ordenar por' name='order'>
					<Select placeholder='Estado del usuario' 
					onChange={handleOrderByChange} 
					options={[
						{
						  value: 'nombre',
						  label: 'Nombre',
						},
						{
						  value: 'apellido',
						  label: 'Apellido',
						},
						{
						  value: 'fechaCreacion',
						  label: 'Fecha de Creación',
						}
					]}/>
				</Form.Item>

				<Button block htmlType='submit' type='primary'>
					Aplicar filtros
				</Button>
			</Form>
		</div>
	);
};
