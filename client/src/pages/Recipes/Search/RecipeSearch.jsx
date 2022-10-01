import { useState, useEffect } from 'react';
import { Col, Row, Button, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Spinner } from '@/components/Loader/Spinner';
import {Link} from 'react-router-dom';

import styles from './RecipeSearch.module.css';

export const RecipeSearch = () => {
	return (
		<div className='contenidoRecetas'>
			<section id='single-page-slider'>
				<Row justify='center' style={{ padding: '2rem 0' }} className='mb-4'>
					<Col span={8}>
						<AutoComplete
							style={{ width: '100%' }}
							options={titlesData}
							placeholder='Escribe la receta que buscas...'
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
								-1
							}
							onSelect={searchRecipeByTitle}
							onSearch={clearSearch}
							onChange={(e) => setRecipeTitle(e)}
							allowClear
						/>
					</Col>
					<Button type='primary' onClick={filterByTitle}>
						<SearchOutlined /> Buscar
					</Button>
				</Row>
			</section>

			<div className='container justify-content-center align-items-center'>
				<Link to={'/recetas/nueva'} className='btn btn-primary'>
					Nueva Receta
				</Link>

				<Link to={'/recetas/categorias'} className='bg-secondary'>
					Realizar la búsqueda por categorías
				</Link>

				{!recipes || recipes.length === 0 ? (
					<Spinner />
				) : (
					<Cards
						recipes={recipes}
						setRecipes={setRecipes}
						page={page}
						setPage={setPage}
						hasMore={hasMore}
						sethasMore={sethasMore}
					/>
				)}
			</div>
		</div>
	);
};
