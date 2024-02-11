import {
	BuildingHospitalIcon,
	ChefHatIcon,
	ShoppingCartIcon,
} from '@/components/Icons';

export const mapCategories = [
	{
		name: 'comercio',
		icon: <ShoppingCartIcon size={48} />,
		bgColor: '#A67D53',
	},
	{
		name: 'hospital',
		icon: <BuildingHospitalIcon size={48} />,
		bgColor: '#C1282F',
	},
	{
		name: 'restaurante',
		icon: <ChefHatIcon size={48} />,
		bgColor: '#EB5C27',
	},
];
