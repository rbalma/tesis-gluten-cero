import { format, formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

export const timeAgo = (date) => {
	const result = formatDistance(new Date(), new Date(date), { locale: es });
	return result ? `Hace ${result}` : '';
};

export const dateFormat = (date) => {
	const result = format(new Date(date), 'dd MMMM, yyyy', {locale: es});
	return result;
}

export const dateLongFormat = (date) => {
	const result = format(new Date(date), 'Pp', {locale: es});
	return result;
}
