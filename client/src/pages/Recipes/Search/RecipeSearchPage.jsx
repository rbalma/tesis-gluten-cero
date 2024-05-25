import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
import { AutoCompleteRecipe } from '@/components/Recipe/AutoComplete/AutoCompleteRecipe';
import { RecipeCard } from '../../../components/Recipe/Card/RecipeCard';
import { IconCirclePlus } from '@/components/Icons';
import { CategoryRecipeCard } from '@/components/Recipe/Categories/CategoryRecipeCard';
import { useGetCategories } from '@/services/queries/categoryQueries';
import { useGetRecipes } from '@/services/queries/recipeQueries';

import styles from './RecipeSearchPage.module.css';

const orderBy = {
	recientes: {
		sortField: 'createdAt',
		sortOrder: 'desc',
	},
	antiguos: {
		sortField: 'createdAt',
		sortOrder: 'asc',
	},
	az: {
		sortField: 'title',
		sortOrder: 'asc',
	},
	za: {
		sortField: 'title',
		sortOrder: 'desc',
	},
	rating: {
		sortField: 'ratingAverage',
		sortOrder: 'desc',
	},
};

const filtersCategories = {
	type: 'R',
	visible: '1',
};

const initialFiltersRecipes = {
	// active: '1',
	sortField: 'createdAt',
	sortOrder: 'desc',
	categoriesIds: [],
};

export const RecipeSearchPage = () => {
	const navigate = useNavigate();
	const { data } = useGetCategories(filtersCategories);
	const [filtersRecipes, setFiltersRecipes] = useState(initialFiltersRecipes);
	const { isSuccess, data: recipes } = useGetRecipes(filtersRecipes);

	const onClickCategory = (newCategoryId) => {
		if (
			filtersRecipes.categoriesIds.some(
				(categoryId) => categoryId === newCategoryId
			)
		) {
			const filteredCategories = filtersRecipes.categoriesIds.filter(
				(categoryId) => categoryId !== newCategoryId
			);

			return setFiltersRecipes((filters) => ({
				...filters,
				categoriesIds: filteredCategories,
			}));
		}

		setFiltersRecipes((filters) => ({
			...filters,
			categoriesIds: [...filters.categoriesIds, newCategoryId],
		}));
	};

	const onSelectOrderBy = (value) => {
		setFiltersRecipes(filters => ({
			...filters,
			...orderBy[value]
		}));
	} 

	return (
		<div className={styles.containerRecipe}>
			<section className={styles.bannerRecipe}>
				<h2>¡Hora de cocinar!</h2>
				{/* <p>Encuentra las mejores comidas y te invitamos a compartir las que conoces</p> */}
				<AutoCompleteRecipe />
			</section>

			<section className={styles.containerCategoryRecipes}>
				{data?.map((category) => (
					<CategoryRecipeCard
						key={category._id}
						category={category}
						onClickCategory={onClickCategory}
					/>
				))}
			</section>

			<div className={styles.containerFiltersRecipe}>
				<div className={styles.totalSort}>
					<h3>{recipes?.count || ''} Recetas</h3>
					<div>
						Ordenar por:
						<Select
							defaultValue='recientes'
							bordered={false}
							dropdownStyle={{ minWidth: 130 }}
							onSelect={onSelectOrderBy}
							placement='bottomLeft'
							options={[
								{
									value: 'recientes',
									label: 'Más recientes',
								},
								{
									value: 'antiguos',
									label: 'Más antiguas',
								},
								{
									value: 'rating',
									label: 'Valoración',
								},
								{
									value: 'az',
									label: 'Nombre (A-Z)',
								},
								{
									value: 'za',
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
				{isSuccess
					? recipes.data.map((recipe) => (
							<RecipeCard
								key={recipe._id}
								recipeId={recipe._id}
								title={recipe.title}
								image={recipe.image.secure_url}
								category={recipe.category.name}
								rating={recipe.ratingAverage.$numberDecimal}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};
