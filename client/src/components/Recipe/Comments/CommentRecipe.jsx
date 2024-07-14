import { useState } from 'react';
import useAuthStore from '@/store/authStore';
import { Button, Divider, Form, Input, Rate, Space } from 'antd';
import { useCreateReplyReview } from '@/services/queries/reviewsQueries';
import { IconArrowBackUp } from '@/components/Icons';
import { timeAgo } from '@/utils/format';
import { rules } from '@/utils/rulesForm';
import { userGetAvatar } from '@/utils/fetchData';

import './CommentRecipe.css';

export const CommentRecipe = ({ _id, rating, content, user, createdAt, reply, recetaId, recipeUserId }) => {
	const userProfile = useAuthStore((state) => state.userProfile);
	const [isReplyOpen, setIsReplyOpen] = useState(false);
	const { isPending, mutateAsync } = useCreateReplyReview(recetaId);

	const addReply = async (values) => {
		try {
			await mutateAsync({ values, reviewId: _id });
			setIsReplyOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='comments_container'>
			<div className='comment'>
				<div className='comment_wrapper'>
					<div className='content'>
						<div className='user_photo'>
							<img src={userGetAvatar(user.avatar)} alt='avatar' />
						</div>
						<div className='comment_info'>
							<Space split={<Divider type='vertical' />}>
								<span className='username'>
									{user.name} {user.lastname}
								</span>
								<span className='date'>{timeAgo(createdAt)}</span>
							</Space>

							<div className='rate'>
								<Rate style={{ fontSize: 12 }} disabled value={rating} />
							</div>

							<div className='text'>{content}</div>
							<div className='actions'>
								{(userProfile?.id === recipeUserId && !reply?._id) ? (
									<button onClick={() => setIsReplyOpen((open) => !open)}>
										<IconArrowBackUp size={16} />{' '}
										{isReplyOpen ? 'Cancelar' : 'Responder'}
									</button>
								) : null}
								<div
									className={`addCommentFormRecipe ${
										isReplyOpen ? 'openForm' : ''
									}`}>
									<Form
										onFinish={addReply}
										className='formAdmin'
										style={{ padding: 20 }}>
										<Form.Item name='content' rules={rules.message}>
											<Input.TextArea
												showCount
												maxLength={150}
												autoSize={{ minRows: 3, maxRows: 3 }}
												placeholder='Escribe tu respuesta'
											/>
										</Form.Item>
										
											<Button
												htmlType='submit'
												className='btn-success'
												shape='round'
												loading={isPending}
												style={{ marginTop: 10 }}>
												Responder
											</Button>
									
									</Form>
								</div>
							</div>
						</div>
					</div>

					{reply ? (
						<div className='replies'>
							<div className='comment'>
								<div className='line'></div>
								<div className='comment_wrapper'>
									<div className='content'>
										<div className='user_photo'>
											<img src={userGetAvatar(reply.user.avatar)} alt='user' />
										</div>
										<div className='comment_info'>
											<Space split={<Divider type='vertical' />}>
												<span className='username'>
													{reply.user.name} {reply.user.lastname}
												</span>
												<span className='date'>{timeAgo(reply.createdAt)}</span>
											</Space>
											<div className='text'>{reply.content}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
