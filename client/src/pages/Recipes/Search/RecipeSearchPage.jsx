import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { AutoCompleteRecipe } from '@/components/Recipe/AutoComplete/AutoCompleteRecipe';
import { RecipeCard } from '../../../components/Recipe/Card/RecipeCard';
import { IconCirclePlus } from '@/components/Icons';
import { CategoryRecipeCard } from '@/components/Recipe/Categories/CategoryRecipeCard';
import { useGetCategories } from '@/services/queries/categoryQueries';

import styles from './RecipeSearchPage.module.css';

const filters = {
	type: 'R',
	visible: '1'
}

export const RecipeSearchPage = () => {
	const navigate = useNavigate();
	const { data } = useGetCategories(filters);
	return (
		<div className={styles.containerRecipe}>
			<section className={styles.bannerRecipe}>
				<h2>¡Hora de cocinar!</h2>
				{/* <p>Encuentra las mejores comidas y te invitamos a compartir las que conoces</p> */}
				<AutoCompleteRecipe />
			</section>
			
			<section className={styles.containerCategoryRecipes}>
				{data?.map((category) => (
					<CategoryRecipeCard key={category._id} category={category} />
				))}
			</section>

			<div className={styles.containerFiltersRecipe}>
				<div className={styles.totalSort}>
					<h3>15 Recetas</h3>
					<div>
						Ordenar por:
						<Select
							defaultValue='jack'
							bordered={false}
							dropdownStyle={{ minWidth: 120 }}
							placement='bottomRight'
							options={[
								{
									value: 'jack',
									label: 'Más recientes',
								},
								{
									value: 'lucy',
									label: 'Más antiguas',
								},
								{
									value: 'pedrod',
									label: 'Valoración',
								},
								{
									value: 'pedro',
									label: 'Nombre (A-Z)',
								},
								{
									value: 'pedrof',
									label: 'Nombre (Z-A)',
								},
							]}
						/>
					</div>
				</div>
				<button
					className={styles.buttonAddRecipe}
					onClick={() => navigate('/receta-formulario')}>
					Agregar Receta <IconCirclePlus size={20} strokeWidth={1} />
				</button>
			</div>

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
