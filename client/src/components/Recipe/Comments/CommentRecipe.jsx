import { useState } from 'react';
import { Button, Form, Input, Rate } from 'antd';
import { IconArrowBackUp } from '@/components/Icons';
import { rules } from '@/utils/rulesForm';
import NoImage from '@/assets/images/no-avatar.png';

import './CommentRecipe.css';
import styles from '../Card/CardRecipeDetail.module.css';

export const CommentRecipe = () => {
	const [isReplyOpen, setIsReplyOpen] = useState(false);

	return (
		<>
			<h3 className={styles.sectionTitle}>
				COMENTARIOS <div className={styles.sectionLine} />
			</h3>

			<div className='comments_container'>
				<div className='comment'>
					<div className='comment_wrapper'>
						<div className='content'>
							<div className='user_photo'>
								<img src={NoImage} alt='' />
							</div>
							<div className='comment_info'>
								<div className='header'>
									<span className='username'>Agustina Bovero</span>
									<span className='date'>_ Hace 2 días</span>
									<span className='rate'>
										<Rate style={{ fontSize: 12 }} disabled value={5} />
									</span>
								</div>
								<div className='text'>Excelente receta</div>
								<div className='actions'>
									<button onClick={() => setIsReplyOpen((open) => !open)}>
										<IconArrowBackUp size={16} />{' '}
										{isReplyOpen ? 'Cancelar' : 'Responder'}
									</button>
										<div className={`addCommentFormRecipe ${isReplyOpen? 'openForm': ''}`}>
											<Form style={{ padding: 20 }}>
												<Form.Item name='comentario' rules={rules.message}>
													<Input.TextArea
														showCount
														maxLength={150}
														autoSize={{ minRows: 3, maxRows: 3 }}
														placeholder='Escribe tu respuesta'
													/>
												</Form.Item>

												<Button
													className='btn-success'
													shape='round'
													style={{ marginTop: 10 }}>
													Responder
												</Button>
											</Form>
										</div>
				
								</div>
							</div>
						</div>
						<div className='replies'>
							<div className='comment'>
								<div className='line'></div>
								<div className='comment_wrapper'>
									<div className='content'>
										<div className='user_photo'>
											<img src={NoImage} alt='user' />
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
