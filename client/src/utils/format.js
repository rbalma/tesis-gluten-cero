import { IconCircleCheck, IconCircleX, IconStar } from '@/components/Icons';
import { format, formatDistance, intlFormatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

export const timeAgo = (date) => {
	const result = intlFormatDistance(new Date(date), new Date(), { locale: es, numeric: 'always' });
	return result || '';
};

export const dateFormat = (date) => {
	const result = format(new Date(date), 'dd MMMM, yyyy', { locale: es });
	return result;
};

export const dateLongFormat = (date) => {
	const result = format(new Date(date), 'Pp', { locale: es });
	return result;
};

export const eventsNotifications = {
	RECIPE_APPROVED: {
		title: 'Tu receta fue aprobada',
		icon: IconCircleCheck,
		color: '#36b37e'
	},
	RECIPE_REJECTED: {
		title: 'Tu receta fue rechazada',
		icon: IconCircleX,
		color: '#f91942'
	},
	RECIPE_VALUED: {
		title: 'Tu receta fue valorada',
		icon: IconStar,
		color: '#ffab00'
	},
};
