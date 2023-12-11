import { Button, Form, Input, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './FiltersAdminNotices.module.css';
import { useState } from 'react';

const { RangePicker } = DatePicker;

export const FiltersAdminNotices = (props) => {

	const { applyFilters } = props;

	const [filters, setFilters] = useState({
		title: '',
		dates: ['', ''],
		orderBy: ''
	});

	const handleTitleChange = (event) => {
        setFilters({
            ...filters,
            title: event.target.value
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
		applyFilters(filters.title, filters.dates, filters.orderBy);
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
					<Input name='title' placeholder='Titulo...' prefix={<SearchOutlined />} onChange={handleTitleChange}/>
				</Form.Item>

				<Form.Item label='Fecha de creación' name='active'>
					<RangePicker
						onChange={handleDateChange}
						placeholder={['Desde', 'Hasta']}
						style={{ width: '100%' }}
					/>
				</Form.Item>

				<Form.Item label='Ordenar por' name='order'>
					<Select 
						placeholder='Fecha de creacion' 
						onChange={handleOrderByChange}
						options={[
							{
							  value: 'recientes',
							  label: 'Recientes',
							},
							{
							  value: 'antiguos',
							  label: 'Antiguos',
							}
						]}
					/>
				</Form.Item>

				<Button block htmlType='submit' type='primary'>
					Aplicar filtros
				</Button>
			</Form>
		</div>
	);
};
