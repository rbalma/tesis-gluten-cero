import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AvatarIcon, CardPost } from './CardPost';
import { EditFilled, MessageFilled, DeleteFilled, HeartFilled, HeartOutlined } from '@ant-design/icons';
import useAuthStore from '@/store/authStore';
import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';
import './PostList.css';

export const PostsList = () => {

	const { userProfile } = useAuthStore();

	const navigate = useNavigate();

	const token = localStorage.getItem('token');

	const [thread, setThread] = useState(null);

	const localParams = useParams();

	useEffect(() => {
		if(userProfile !== null) {
			const fetchData = async () => {
				const res = await fetch(`http://localhost:5000/api/threads/${localParams.hiloId}`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`
					},
				});
				const data = await res.json();
				setThread(data.data);
			};
			fetchData();
		};
	}, []);

	const deletePost = (postId) => {
		const threadCopy = {...thread};
		const updatedThreadPosts = threadCopy.posts.filter(post=>post._id !== postId);
		threadCopy.posts = updatedThreadPosts;
		setThread(threadCopy);
	};

	const Thread = () => {

		/* Indica si el usuario logueado likea el thread o no */
		const [liked, setLiked] = useState(thread.likes.includes(userProfile.id));

		/* Manejo form respuesta */
		const [formData, setFormData] = useState('');

		const submit = async (event) => {
			event.preventDefault();
			
			try {
				const response = await fetch('http://localhost:5000/api/posts', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify({
						content: formData,
						threadId: thread._id
					}),
				});

				const data = await response.json();

				setThread({
					...thread,
					posts: [
						...thread.posts,
						{
							_id: data.post._id, 
							content: data.post.content, 
							date: data.post.date, 
							isUpdated: false,
							user: userProfile
						}
					]
				});
			} catch(error) {
				console.log(error);
			};
		};

		const closeThread = async () => {
			try {
				await fetch(`http://localhost:5000/api/threads/${localParams.hiloId}`, {
					method: 'PUT',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify({
						status: 'closed'
					}),
				});

				navigate('/foro');
			} catch(error) {
				console.log(error);
			};
		};

		const deleteThread = async () => {
			try {
				await fetch(`http://localhost:5000/api/threads/${localParams.hiloId}`, {
					method: 'DELETE',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				});

				navigate('/foro');
			} catch(error) {
				console.log(error);
			};
		};

		const likeThread = async () => {
			const threadCopy = {...thread};
			let likesCopy = threadCopy.likes;

			if(liked) {
				likesCopy = likesCopy.filter(userId => userId !== userProfile.id)
			} else {
				likesCopy.push(userProfile.id);
			};

			try {
				await fetch(`http://localhost:5000/api/threads/${localParams.hiloId}`, {
					method: 'PUT',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify({
						likes: likesCopy,
					}),
				});
			} catch(error) {
				console.log(error)
			};

			setThread({
				...thread,
				likes: likesCopy,
			});
		};

		return(
			<div className='postlist-thread-container'>
				<div className='postlist-thread'>
					<div className='postlist-card-container'>
						<div className='postlist-card-user'>
							<AvatarIcon user={thread.user}/>
						</div>
						<div className='postlist-card-body'>
							<div className="postlist-card-status">
								<div className="card-status__estado">
									<p style={{'display': 'flex'}}>{thread.user.name} {thread.user.lastname}</p>
									{thread.status === 'closed' ? <p>Cerrado</p> :
									<p className='postlist-status-label' onClick={closeThread}></p>
									}
								</div>
								<div className="postlist-card-status__time">
									<p>{thread.date.split('T')[0]}</p>
								</div>
							</div>
							<div className="postlist-card-content">
								<div className="post-card-content__title">
									<p>{thread.title}</p>
								</div>
								<div className='card-content-description'>
									<p>{thread.description}</p>
								</div>
								<div className="card-content__info">
									<div className='card-content__info-respuestas'>
										<MessageFilled />
										<p>{thread.posts.length}</p>
										<p>Respuestas</p>
									</div>
									<div className='card-content__info-votos '>
										{liked?
											<HeartFilled 
												style={{'color':'rgb(248, 53, 53)'}}
												className='card-content__info-votos-active' 
												onClick={likeThread}
											/>
										:
											<HeartOutlined 
												className='card-content__info-votos-active' 
												onClick={likeThread}
											/>
										}
										<p>{thread.likes.length}</p>
										<p>likes</p>
									</div>
									{(userProfile.id === thread.user._id && thread.status === 'open') &&
										<Link to={`/foro-formulario-edit/${thread._id}`} className='card-content__edit'>
											<EditFilled />
										</Link>
									}
									{(userProfile.role === 'admin' && thread.status === 'open') &&
										<div className='card-content__delete' onClick={deleteThread}>
											<DeleteFilled />
										</div>
									}
								</div>
							</div>
						</div>
					</div>
					<div className='postlist-posts'>
						<h2>Respuestas</h2>
						{thread.posts.length === 0 && <p>No hay respuestas</p>}
						{thread.posts.map((post) => (
							<CardPost key={post._id} post={post} status={thread.status} updateMotherThread={deletePost}/>
						))}
					</div>
					<div className='postlist-answer-form'>
						{thread.status === 'closed' ?
							<div className='closed-thread-banner'>Topic Cerrado</div>
						:
							<form onSubmit={submit}>
								<textarea 
									placeholder='Responde aquí...'
									rows={4}
									value={formData}
									required
									name='respuesta'
									onChange={(event) => setFormData(event.target.value)}
								/>
								<button type='submit'>Responder</button>
							</form>
						}
					</div>
				</div>
			</div>
		)
	} 

	if(userProfile === null) {
		return(
			<NotFoundScreen/>
		);
	};

	return (
		<div className='foro-container'>
			<div className='foro-container-background'>
				{
					thread === null ? <h1>Cargando...</h1> :
					<Thread/>
				}
			</div>
		</div>
	);
};