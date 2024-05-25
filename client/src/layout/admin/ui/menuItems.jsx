import {
	IconChartBar,
	IconMessage,
	IconNews,
	IconTag,
	IconToolsKitchen,
	IconUserCircle,
	MapPinIcon,
} from '@/components/Icons';

export const menuItems = [
	{
		label: 'Estadísticas',
		icon: <IconChartBar />,
		link: '/admin/estadisticas',
	},
	{
		label: 'Usuarios',
		icon: <IconUserCircle />,
		link: '/admin/usuarios',
	},
	{
		label: 'Recetas',
		icon: <IconToolsKitchen />,
		link: '/admin/recetas',
	},
	{
		label: 'Marcadores',
		icon: <MapPinIcon />,
		link: '/admin/mapa',
	},
	{
		label: 'Foros',
		icon: <IconMessage />,
		link: '/admin/foro',
	},
	{
		label: 'Noticias',
		icon: <IconNews />,
		link: '/admin/noticias',
	},
	{
		label: 'Categorías',
		icon: <IconTag />,
		link: '/admin/categorias',
	},
];
