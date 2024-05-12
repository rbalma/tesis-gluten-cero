import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoComplete, Input } from 'antd';
import {
	IconLoading,
	IconTag,
	SearchIcon,
} from '@/components/Icons';
import { useSearchRecipes } from '@/services/queries/recipeQueries';
import useDebounce from '@/hooks/useDebounce';

import styles from './AutoCompleteRecipe.module.css';

export const AutoCompleteRecipe = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const debounceSearch = useDebounce(search, 700);
	const { data, isFetching } = useSearchRecipes(debounceSearch);

	const onSearchRecipes = async (value) => {
		if (!value) return;
		setSearch(value);
	};

	const navigateToRecipe = (recipeId) => {
		navigate(`/recetas/${recipeId}`);
	};

	return (
		<AutoComplete
			style={{ maxWidth: 750, width: '100%' }}
			options={data?.data?.map((r) => ({
				label: (
					<span className={styles.optionsRecipe}>
						<img alt='recipe' src={r.image.secure_url} />{' '}
						<div>
							<p>{r.title}</p>
							<span>
								<IconTag size={14} /> {r.category.name}
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
				suffix={
					isFetching ? (
						<div style={{ marginTop: 7 }}>
							<IconLoading />
						</div>
					) : null
				}
				placeholder='Escribe la receta que buscas...'
				className='autocompleteInputRecipe'
			/>
		</AutoComplete>
	);
};
