import { Avatar, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import useAuthStore from '@/store/authStore';
import { userGetAvatar } from '@/utils/fetchData';
import {
	IconLockSquareRounded,
	IconLogout,
	IconUserCircle,
} from '@/components/Icons';

export const UserProfile = ({ overlayClassName = 'profileDropdown' }) => {
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.userProfile);
	const removeUser = useAuthStore((state) => state.removeUser);

	const logoutUser = () => {
		removeUser();
		googleLogout();
		navigate('/');
	};

	const items = [
		{
			key: '01',
			label: <Link to={`/perfil/${user.id}`}>Mi Perfil</Link>,
			icon: <IconUserCircle />,
		},
		user.role === 'admin'
			? {
					key: '04',
					label: <Link to='/admin/estadisticas'>Panel Admin</Link>,
					icon: <IconLockSquareRounded />,
			  }
			: null,
		{
			type: 'divider',
		},
		{
			key: '03',
			label: <span onClick={logoutUser}>Cerrar Sesión</span>,
			icon: <IconLogout />,
			danger: true,
		},
	];

	return (
		<Dropdown
			overlayClassName={overlayClassName}
			menu={{ items, inlineIndent: 45 }}
			trigger={['click']}
			placement='bottomRight'>
			<Avatar
				style={{ cursor: 'pointer' }}
				src={userGetAvatar(user.avatar)}
				size='default'
			/>
		</Dropdown>
	);
};
