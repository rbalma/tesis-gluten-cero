import { useState, useEffect, useRef } from 'react';
import { Col, Row, Button, AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Spinner } from '@/components/Loader/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as underscore from 'underscore';
import useCrud from '@/hooks/useCrud';

import styles from './RecipeSearch.module.css';
import { RecipeCard } from './Card/RecipeCard';

export const RecipeSearch = () => {
	const [resultData, setResultData] = useState([]);
	const { 0: loading, 3: getRecipesData } = useCrud('/recipes');
	const navigate = useNavigate();

	const onSearchRecipes = async (value) => {
		if (!value) return;

		const recipes = await getRecipesData({ search: value });
		if (recipes?.ok) {
			const newResp = recipes.data.map((r) => ({
				value: r._id,
				label: r.title,
			}));
			setResultData(newResp);
		}
	};

	const onSearch = useRef(
		underscore.debounce((value) => onSearchRecipes(value), 500)
	).current;

	const navigateToRecipe = (recipeId) => {
		navigate(`/receta/${recipeId}`);
	};

	return (
		<div className={styles.container}>
			<section className={styles.banner}>
				<Row justify='center' className={styles.divAutocomplete}>
					<Col xs={20} sm={10}>
						<AutoComplete
							notFoundContent={loading}
							style={{ width: '100%' }}
							options={resultData}
							onSearch={onSearch}
							onSelect={navigateToRecipe}
						>
							<Input
								suffix={<SearchOutlined />}
								size='large'
								placeholder='Escribe la receta que buscas...'
							/>
						</AutoComplete>
					</Col>
					{/* <Button type='primary' onClick={filterByTitle}>
						<SearchOutlined /> Buscar
					</Button> */}
				</Row>
			</section>

			<div className={styles.divBtn}>
				<Button
					className='gx-btn-info'
					onClick={() => navigate('/receta-formulario')}
				>
					Agregar Receta
				</Button>

				{/* {!recipes || recipes.length === 0 ? (
					<Spinner />
				) : ( */}
				{/* )} */}
			</div>

			<RecipeCard />
		</div>
	);
};
