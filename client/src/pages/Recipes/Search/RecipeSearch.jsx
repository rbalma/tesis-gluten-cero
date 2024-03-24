import { useState, useRef } from 'react';
import { Col, Row, Button, AutoComplete, Input, Segmented } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Spinner } from '@/components/Loader/Spinner';
import { useNavigate } from 'react-router-dom';
import debounce from 'underscore/modules/debounce.js';
import { RecipeCard } from './Card/RecipeCard'; 
import useCrud from '@/hooks/useCrud';

import styles from './RecipeSearch.module.css';

export const RecipeSearch = () => {
	const navigate = useNavigate();
	const { 0: loading, 2: getRecipesData } = useCrud('/recipes');
	const [resultData, setResultData] = useState([]);
	const [value, setValue] = useState('Map');
	

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
		debounce((value) => onSearchRecipes(value), 500)
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
							onSelect={navigateToRecipe}>
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

			{/* <div className={styles.divBtn}>
				<Button
					className='gx-btn-info'
					onClick={() => navigate('/receta-formulario')}
				>
					Agregar Receta
				</Button>
			</div>

			<div className={styles.scroller}>
			<Segmented options={['Map', 'Transit', 'Satellite', 'Dulces', 'Aperitivos', 'Postres', 'Helado', 'Crema', 'Naranja']} value={value} onChange={setValue} />
			</div> */}

			<div className={styles.recipesGrid}>
				<RecipeCard
					title='Rosca de Pascua'
					image='https://www.lavoz.com.ar/resizer/igh8fcDUwk3e7p8NyRsEfbPe4-8=/0x0:0x0/980x640/filters:quality(80):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/G4ZDQNBSHFTDKOJXGU2DMNBZGI.jpg'
					category='Dulces'
					date={'20/03/2024'}
				/>
				<RecipeCard
					title='Ñoquis de papa y zapallo'
					image='https://img-global.cpcdn.com/recipes/6ab24d3a956ff32a/680x482cq70/noquis-de-papa-y-zapallo-sin-gluten-foto-principal.webp'
					category='Plato Principal'
					date={'12/03/2024'}
				/>
				<RecipeCard
					title='Pizzetas de papa sin tacc'
					image='https://img-global.cpcdn.com/recipes/3b72696969c1d19c/680x482cq70/pizzetas-de-papa-sin-tacc-foto-principal.webp'
					category='Plato Principal'
					date={'07/03/2024'}
				/>
			</div>
		</div>
	);
};
