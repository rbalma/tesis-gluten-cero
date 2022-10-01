import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './RecipeCard.css';


export const RecipeCard = () => {
	return (
		<div className='card-recipe card-1'>
			<div className='card-img'></div>
			<Link to={`/recetas/${recipe._id}`} className='card-link'>
				<div
					className='card-img-hovered'
					style={{
						backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.65)
      ), url(${image})`,
					}}
				></div>
				<div className='card-info'>
					<div className='card-about'>
						<div className='card-tag tag-news'>{recipe.category}</div>
						<div style={{ color: '#9B9B9B' }}>
							{day}/{month}/{year}
						</div>
					</div>
					<h1 className='card-title'>{recipe.title}</h1>
					<div className='card-creator'>
						<UserOutlined /> {recipe.user.name} {recipe.user.lastname}
					</div>
				</div>
			</Link>
		</div>
	);
};
