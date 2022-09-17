import { NavLink } from 'react-router-dom';
import {
	BarChartOutlined,
	TeamOutlined,
	UnorderedListOutlined,
	BookOutlined,
	EnvironmentOutlined,
	FileExcelOutlined,
	MessageOutlined,
	SnippetsOutlined
} from '@ant-design/icons';


export const menuItems = [
	{
		label: <NavLink to='/admin/estadisticas'>Estadísticas</NavLink>,
		icon: <BarChartOutlined />,
		key: '/admin/estadisticas',
	},
	{
		label: <NavLink to='/admin/usuarios'>Usuarios</NavLink>,
		icon: <TeamOutlined />,
		key: '/admin/usuarios',
	},
	{
		key: 'recetas',
		type: 'subMenu',
		icon: <SnippetsOutlined />,
		label: 'Recetas',
		children: [
			{
				label: <NavLink to='/admin/recetas'>Publicadas</NavLink>,
				key: '/admin/recetas',
			},
			{
				label: <NavLink to='/admin/recetas-categorias'>Categorías</NavLink>,
				key: '/admin/categorias',
			},
		],
	},
	{
		label: <NavLink to='/admin/noticias'>Noticias</NavLink>,
		icon: <BookOutlined />,
		key: '/admin/noticias',
	},
	{
		label: <NavLink to='/admin/mapa'>Mapa</NavLink>,
		icon: <EnvironmentOutlined />,
		key: '/admin/mapa',
	},
	{
		label: <NavLink to='/admin/foro'>Foro</NavLink>,
		icon: <MessageOutlined />,
		key: '/admin/foro',
	},
	{
		label: <NavLink to='/admin/productos'>Productos</NavLink>,
		icon: <FileExcelOutlined />,
		key: '/admin/productos',
	},
];

// const MenuItems = () => {
// 	const location = useLocation();

// 	return (
// 		<Menu
// 			theme='dark'
// 			mode='vertical'
// 			defaultSelectedKeys={[location.pathname]}
// 			items={menuItems}
// 		/>
// 	);
// };
