import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { userGetAvatar } from '@/utils/fetchData';
import useAuthStore from '@/store/authStore';
import { DeleteFilled, EditFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './CardPost.css';

function AvatarIcon(props) {

	const { user } = props;

	const [avatar, setAvatar] = useState('');

	useEffect(() => {
		if (user.avatar && user.userGoogle) {
			setAvatar(user.avatar);
		} else if (user.avatar && !user.userGoogle) {
			setAvatar(userGetAvatar(user.avatar));
		} else {
			setAvatar(user?.dicebear);
		}
	}, [user]);

	return(
		<Avatar
			size={{ xs: 45, sm: 45, md: 45, lg: 45, xl: 60, xxl: 60 }}
			src={avatar}
		/>
	)
}

function CardPost(props) {

	const { post, status, updateMotherThread } = props;

	const [postCopy, setPostCopy] = useState(post);

	const { userProfile } = useAuthStore();

	const token = localStorage.getItem('token');

	const [editMode, setEditMode] = useState(false);
	
	const [newContent, setNewContent] = useState(post.content)

	const closeEditMode = () => {
		setEditMode(false);
		setNewContent(postCopy.content);
	};

	const deletePost = async () => {
		try {
			const response = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
			});
	
			const data = await response.json();
			console.log(data);
			updateMotherThread(post._id);
		} catch(error) {
			console.log(error)
		};
	};

	const editPost = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(`http://localhost:5000/api/posts/${post._id}`, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					content: newContent,
					thread: post.thread
				}),
			});
	
			const data = await response.json();
			console.log(data);

			const postCopy = {...post};
			postCopy.content = newContent;
			setPostCopy(postCopy);

			setEditMode(false);
		} catch(error) {
			console.log(error)
		};
	};

	return(
		<div className='post-container'>
			<div className='post-avatar'>
				<AvatarIcon user={postCopy.user}/>
			</div>
			<div className='post-content'>
				<div className='post-info'>
					<div className='post-info__user'>
						<p>{postCopy.user.name} {postCopy.user.lastname}</p>
						{((userProfile.role === 'admin' || (userProfile.id === postCopy.user._id || userProfile.id === postCopy.user.id)) && status === 'open') &&
							<div className='card-content__delete' onClick={deletePost}>
								<DeleteFilled />
							</div>
						}
						{((userProfile.id === postCopy.user._id || userProfile.id === postCopy.user.id) && status === 'open') &&
							<>
								{editMode?
									<div className='card-content__edit' onClick={()=>closeEditMode()}>
										<CloseOutlined />
									</div>
								:
									<div className='card-content__edit' onClick={()=>setEditMode(true)}>
										<EditFilled />
									</div>
								}
							</>
						}
					</div>
					<div className='post-info__date'>
						<p>{postCopy.date.split('T')[0]}</p>
					</div>
				</div>
				{editMode? 
					<div className='post-content'>
						<form onSubmit={editPost} className='post-content-edit-form'>
							<textarea
								rows={3}
								value={newContent}
								placeholder='Responde aquí...'
								onChange={(event) => setNewContent(event.target.value)}
							/>
							<button type='submit'>
								<CheckOutlined />
							</button>
						</form>
					</div>
				:
					<div className='post-text'>
						<p>{postCopy.content}</p>
					</div>
				}
			</div>
		</div>
	);
};

export {CardPost, AvatarIcon};





















































































// import { Avatar, Button, Menu, Dropdown } from 'antd';
// import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';
// import styles from './CardPost.module.css';

// const menu = (
// 	<Menu>
// 		<Menu.Item key='0'>
// 			<a href='https://www.antgroup.com'>Editar</a>
// 		</Menu.Item>
// 		<Menu.Item key='1'>
// 			<a href='https://www.aliyun.com'>Eliminar</a>
// 		</Menu.Item>
// 	</Menu>
// );

// export const CardPost = () => {
// 	return (
// 		<div className={styles.containerPost}>
// 			<div className={styles.cardUser}>
// 				<Avatar
// 					size={{ xs: 45, sm: 45, md: 45, lg: 45, xl: 70, xxl: 70 }}
// 					icon={<UserOutlined />}
// 				/>
// 				<p className={styles.nameUser}>Rodrigo Balmaceda</p>
// 				<span className={styles.typeUser}>ADMIN</span>
// 			</div>

// 			<div className={styles.cardData}>
// 				<div className={styles.cardDataHead}>
// 					<span>Posted November 16, 2005 (editado)</span>
// 					<Dropdown overlay={menu} trigger={['click']}>
// 						<Button type='dashed' icon={<EllipsisOutlined />}></Button>
// 					</Dropdown>
// 				</div>
// 				<div className={styles.cardDataBody}>
// 					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
// 					deleniti dolorem aperiam id, neque nihil hic officiis a, ipsa dolores
// 					reiciendis unde quaerat. Cum dignissimos tenetur atque excepturi saepe
// 					similique. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
// 					Quod deleniti dolorem aperiam id, neque nihil hic officiis a, ipsa
// 					dolores reiciendis unde quaerat. Cum dignissimos tenetur atque
// 					excepturi saepe similique. Lorem ipsum dolor sit, amet consectetur
// 					adipisicing elit. Quod deleniti dolorem aperiam id, neque nihil hic
// 					officiis a, ipsa dolores reiciendis unde quaerat. Cum dignissimos
// 					tenetur atque excepturi saepe similique. Lorem ipsum dolor sit, amet
// 					consectetur adipisicing elit. Quod deleniti dolorem aperiam id, neque
// 					nihil hic officiis a, ipsa dolores reiciendis unde quaerat. Cum
// 					dignissimos tenetur atque excepturi saepe similique.
// 				</div>

// 				<div className={styles.cardDataFooter}>
// 					<Button> Responder </Button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
