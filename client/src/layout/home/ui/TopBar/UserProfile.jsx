import { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import {
	IdcardFilled,
	SettingFilled,
	LockFilled,
	LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { userGetAvatar } from '@/utils/fetchData';

export const UserProfile = () => {
	const {
		userProfile: user,
		removeUser,
	} = useAuthStore();
	const navigate = useNavigate();
	const [avatar, setAvatar] = useState('');

	useEffect(() => {
		if (user?.avatar) {
			return setAvatar(userGetAvatar(user.avatar));
		}
		if (user?.google) {
			return setAvatar(user.avatarUrl);
		}

		setAvatar(user?.dicebear);
	}, [user]);

	const logoutUser = () => {
		removeUser();
		navigate('/');
	};

	const menuPerfil = (
		<Menu style={{ fontFamily: 'Sora, Verdana' }}>
			<Menu.Item key='1' icon={<IdcardFilled />}>
				<Link to={`/perfil/${user.id}`}>Perfil</Link>
			</Menu.Item>
			<Menu.Item key='2' icon={<SettingFilled />}>
				<Link to={`/perfil/${user.id}/panel/configuracion`}>Configuración</Link>
			</Menu.Item>

			{user.role === 'admin' && (
				<Menu.Item key='4' icon={<LockFilled />}>
					<Link to='/admin'>Panel Admin</Link>
				</Menu.Item>
			)}

			<Menu.Divider />
			<Menu.Item key='3' onClick={logoutUser} danger icon={<LogoutOutlined />}>
				Cerrar Sesión
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown
			overlay={menuPerfil}
			trigger={['click']}
			placement='bottom'
			arrow
		>
			<Avatar
				style={{ cursor: 'pointer' }}
				src={avatar || user.dicebear}
				size='large'
			/>
		</Dropdown>
	);
};
