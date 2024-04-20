import { Button, Form, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from '../Notices/FiltersAdminNotices.module.css';
import { useState } from 'react';

export const FiltersAdminCategories = (props) => {

	const { applyFilters } = props;

	const [filters, setFilters] = useState({
		name: '',
		type: 'Todas'
	});

	const handleTitleChange = (event) => {
        setFilters({
            ...filters,
            name: event.target.value
        });
    };

	const handleTypeChange = (value) => {
		setFilters({
            ...filters,
            type: value
        });
    };

	const handleFilters = (v) => {
		console.log({ v });
		applyFilters(filters.name, filters.type);
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
					<Input name='title' placeholder='Nombre...' prefix={<SearchOutlined />} onChange={handleTitleChange}/>
				</Form.Item>

				<Form.Item label='Filtrar por' name='order'>
					<Select 
						placeholder='Tipo' 
						onChange={handleTypeChange}
						defaultValue={{
							value: 'Todas',
							label: 'Todas',
						}}
						options={[
							{
							  value: 'Receta',
							  label: 'Receta',
							},
							{
							  value: 'Mapa',
							  label: 'Mapa',
							},
							{
								value: 'Todas',
								label: 'Todas',
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
