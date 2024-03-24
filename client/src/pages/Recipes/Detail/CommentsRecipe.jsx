import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import NoImage from '@/assets/images/no-avatar.png';

import './CommentsRecipe.css';

export const CommentsRecipe = () => {
	const [comment, setComment] = useState('');

	const addComment = () => {
		console.log(comment);
	};

	return (
		<>
			<div id='comment-form' style={{ width: '90%', marginInline: 'auto' }}>
				<h5>Escribe un comentario</h5>

				<div className='col-sm-12'>
					<Input.TextArea
						showCount
						maxLength={100}
						autoSize={{ minRows: 3, maxRows: 3 }}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>

				<div className='col-sm-1 col-md-3' style={{ marginTop: 8 }}>
					<Button
						type='submit'
						className='btn btn-primary btn-outlined'
						style={{ fontSize: '12px' }}
						onClick={addComment}>
						Comentar
					</Button>
				</div>
			</div>

			<div className='comments_container'>
				<div className='comment'>
					<div className='comment_wrapper'>
						<div className='content'>
							<div className='user_photo'>
								<img src={NoImage} alt='' width='50' />
							</div>
							<div className='comment_info'>
								<div className='header'>
									<span className='username'>Agustina Bovero</span>
									<span className='date'>Hace 2 días</span>
								</div>
								<div className='text'>Excelente receta</div>
								<div className='actions'>
									<button>
										<RollbackOutlined /> Responder
									</button>
								</div>
							</div>
						</div>
						<div className='replies'>
							<div className='comment'>
								<div className='line'></div>
								<div className='comment_wrapper'>
									<div className='content'>
										<div className='user_photo'>
											<img src={NoImage} alt='' width='50' />
										</div>
										<div className='comment_info'>
											<div className='header'>
												<span className='username'>Ignacio Paez</span>
												<span className='date'>Hace 1 día</span>
											</div>
											<div className='text'>Gracias! ❤</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
