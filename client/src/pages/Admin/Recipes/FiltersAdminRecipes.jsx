import { Button, Form, Input, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './FiltersAdminRecipes.module.css';

const { RangePicker } = DatePicker;

export const FiltersAdminRecipes = () => {
	const handleFilters = (v) => {
		console.log({ v });
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
						placeholder='Titulo, categoria....'
						prefix={<SearchOutlined />}
					/>
				</Form.Item>

				<Form.Item label='Categoria' name='active'>
					<Select placeholder='Categoria de la receta' />
				</Form.Item>

				<Form.Item label='Fecha de creación' name='active'>
					<RangePicker placeholder={['Desde','Hasta']} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item label='Ordenar por' name='order'>
					<Select placeholder='Categoria'>
						<Option>
							A - Z
						</Option>
						<Option>
							Z - A
						</Option>
						<Option>
							Estado
						</Option>
					</Select>
				</Form.Item>

				<Button block htmlType='submit' type='primary'>
					Aplicar filtros
				</Button>
			</Form>
		</div>
	);
};
