import {
	IconBell,
	IconBookmark,
	IconChevronDown,
	IconHeart,
	IconMessage,
	IconStar,
	IconToolsKitchen,
	IconUserCircle,
	MapPinIcon,
} from '@/components/Icons';
import { IconMessages } from '@/components/Icons/IconMessages';

export const menuItems = [
	{
		name: 'Perfil',
		link: '',
		icon: <IconUserCircle />,
	},
	{
		name: 'Notificaciones',
		icon: <IconBell />,
		link: '/notificaciones',
	},
	{
		name: 'Recetas',
		icon: <IconChevronDown />,
		items: [
			{
				name: 'Creadas',
				link: '/recetas',
				icon: <IconToolsKitchen />,
			},
			{
				name: 'Favoritas',
				link: '/recetas/favoritas',
				icon: <IconHeart />,
			},
			{
				name: 'Reseñas',
				link: '/recetas/calificadas',
				icon: <IconStar />,
			},
		],
	},
	{
		name: 'Marcadores',
		icon: <IconChevronDown />,
		items: [
			// {
			// 	name: 'Creados',
			// 	link: '/marcadores',
			// 	icon: <MapPinIcon />,
			// },
			{
				name: 'Favoritos',
				link: '/marcadores/favoritos',
				icon: <IconHeart />,
			},
			{
				name: 'Reseñas',
				link: '/marcadores/calificados',
				icon: <IconStar />,
			},
		],
	},
	{
		name: 'Foro',
		icon: <IconChevronDown />,
		items: [
			{
				name: 'Creados',
				link: '/foro',
				icon: <IconMessage />,
			},
			{
				name: 'Guardados',
				link: '/foro/favoritos',
				icon: <IconBookmark />,
			},
			{
				name: 'Posteos',
				link: '/posteos',
				icon: <IconMessages />,
			},
		],
	},
];
