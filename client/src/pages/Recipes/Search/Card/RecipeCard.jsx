import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './RecipeCard.css';


export const RecipeCard = ({ title, image, category, date }) => {
	return (
		<div className='card-recipe card-1'>
			<div className='card-img'></div>
			<Link to={`/recetas/a156d1as1d65`} className='card-link'>
				<div
					className='card-img-hovered'
					style={{
						backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.65)
      ), url('${image}')`,
					}}
				></div>
				<div className='card-info'>
					<div className='card-about'>
						<div className='card-tag tag-news'>{ category }</div>
						<div style={{ color: '#9B9B9B' }}>
							{date}
						</div>
					</div>
					<h1 className='card-title'>{ title }</h1>
					{/* <div className='card-creator'>
						<UserOutlined /> NOMBRE APELLIDO
					</div> */}
				</div>
			</Link>
		</div>
	);
};
