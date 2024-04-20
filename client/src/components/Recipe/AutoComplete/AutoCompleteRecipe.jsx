import { useNavigate } from 'react-router-dom';
import { AutoComplete, Input } from 'antd';
import { IconTag, SearchIcon } from '@/components/Icons';
import useCrud from '@/hooks/useCrud';

import styles from './AutoCompleteRecipe.module.css';
import { useState } from 'react';

export const AutoCompleteRecipe = () => {
	const navigate = useNavigate();
	const [resultData, setResultData] = useState([]);
	const { 0: loading, 2: getRecipesData } = useCrud('/recipes');

	const onSearchRecipes = async (value) => {
		if (!value) return;

		const recipes = await getRecipesData({ search: value });
		if (recipes?.ok) {
			setResultData(recipes.data);
		}
	};

	const navigateToRecipe = (recipeId) => {
		navigate(`/receta/${recipeId}`);
	};

	return (
		<AutoComplete
			style={{ maxWidth: 750, width: '100%' }}
			options={resultData.map((r) => ({
				label: (
					<span className={styles.optionsRecipe}>
						<img
							alt='recipe'
							src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFU4F3ENTPVbAtwkQBH7mK27Z0s3eeHpM0w&usqp=CAU'
						/>{' '}
						<div>
							<p>{r.title}</p>
							<span>
								<IconTag size={14} /> Categoría
							</span>
						</div>
					</span>
				),
				value: r._id,
			}))}
			onSearch={onSearchRecipes}
			onSelect={navigateToRecipe}>
			<Input
				prefix={<SearchIcon />}
				placeholder='Escribe la receta que buscas...'
				className='autocompleteInputRecipe'
			/>
		</AutoComplete>
	);
};
