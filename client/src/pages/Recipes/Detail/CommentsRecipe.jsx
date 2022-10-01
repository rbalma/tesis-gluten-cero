import React, { useState } from 'react';
import { Input } from 'antd';
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
			<div id='comment-form'>
				<h5>Escribe un comentario</h5>

				<div className='col-sm-12'>
					<Input.TextArea
						showCount
						maxLength={100}
						autoSize={{ minRows: 3, maxRows: 3 }}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>

				<div className='col-sm-1 col-md-3'>
					<button
						type='submit'
						className='btn btn-primary btn-outlined'
						style={{ fontSize: '12px' }}
						onClick={addComment}
					>
						Comentar
					</button>
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
									<span className='username'>@vidamrr</span>
									<span className='date'>5 hrs ago</span>
								</div>
								<div className='text'>Este es un comentario</div>
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
												<span className='username'>@vidamrr</span>
												<span className='date'>5 hrs ago</span>
											</div>
											<div className='text'>Este es un comentario</div>
										</div>
									</div>
								</div>
							</div>

							<div className='comment'>
								<div className='line'></div>
								<div className='comment_wrapper'>
									<div className='content'>
										<div className='user_photo'>
											<img src={NoImage} alt='' width='50' />
										</div>
										<div className='comment_info'>
											<div className='header'>
												<span className='username'>@vidamrr</span>
												<span className='date'>5 hrs ago</span>
											</div>
											<div className='text'>Este es un comentario</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='comment'>
					<div className='comment_wrapper'>
						<div className='content'>
							<div className='user_photo'>
								<img src={NoImage} alt='' width='50' />
							</div>
							<div className='comment_info'>
								<div className='header'>
									<span className='username'>@vidamrr</span>
									<span className='date'>5 hrs ago</span>
								</div>
								<div className='text'>Este es un comentario</div>
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
												<span className='username'>@vidamrr</span>
												<span className='date'>5 hrs ago</span>
											</div>
											<div className='text'>Este es un comentario</div>
										</div>
									</div>
								</div>
							</div>

							<div className='comment'>
								<div className='line'></div>
								<div className='comment_wrapper'>
									<div className='content'>
										<div className='user_photo'>
											<img src={NoImage} alt='' width='50' />
										</div>
										<div className='comment_info'>
											<div className='header'>
												<span className='username'>@vidamrr</span>
												<span className='date'>5 hrs ago</span>
											</div>
											<div className='text'>Este es un comentario</div>
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
