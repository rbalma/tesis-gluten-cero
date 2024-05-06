import { useEffect, useState } from 'react';
import { Avatar, Dropdown } from 'antd';
import {
	IdcardFilled,
	SettingFilled,
	LockFilled,
	LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import useAuthStore from '@/store/authStore';
import { userGetAvatar } from '@/utils/fetchData';

export const UserProfile = () => {
	const { userProfile: user, removeUser } = useAuthStore();
	const navigate = useNavigate();
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

	const logoutUser = () => {
		removeUser();
		googleLogout();
		navigate('/');
	};

	const items = [
		{
			key: '01',
			label: (
				<Link style={{ fontFamily: 'Sora, Verdana' }} to={`/perfil/${user.id}`}>
					Perfil
				</Link>
			),
			icon: <IdcardFilled />,
		},
		user.role === 'admin' && {
			key: '04',
			label: (
				<Link style={{ fontFamily: 'Sora, Verdana' }} to='/admin/estadisticas'>
					Panel Admin
				</Link>
			),
			icon: <LockFilled />,
		},
		{
			type: 'divider',
		},
		{
			key: '03',
			label: (
				<div style={{ fontFamily: 'Sora, Verdana' }} onClick={logoutUser}>
					Cerrar Sesión
				</div>
			),
			icon: <LogoutOutlined />,
			danger: true,
		},
	];

	return (
		<Dropdown menu={{ items }} trigger={['click']} placement='bottom' arrow>
			<Avatar style={{ cursor: 'pointer' }} src={avatar} size='large' />
		</Dropdown>
	);
};
