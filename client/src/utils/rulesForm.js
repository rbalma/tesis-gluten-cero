export const rules = {
	fullName: [
		{
			required: true,
			message: 'Completa el campo',
		},
		{
			min: 4,
			message: 'Mínimo de 4 caracteres',
			validateTrigger: 'onSubmit',
		},
		{
			whitespace: true,
			message: 'El campo está vacío',
			validateTrigger: 'onSubmit',
		},
	],
	email: [
		{
			required: true,
			message: 'El correo es obligatorio',
		},
		{
			type: 'email',
			message: 'Debe ingresar un correo válido',
			validateTrigger: 'onSubmit',
		},
	],
	password: [
		{
			required: true,
			message: 'La contraseña es obligatoria',
			validateTrigger: 'onSubmit',
		},
		{
			pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,30}$/,
			message:
				'Entre 8 y 30 caracteres. Como mínimo una letra minúscula, una letra mayúscula y un número.',
		},
	],
	passwordConfirm: [
		{
			required: true,
			message: 'Debe confirmar la contraseña',
			validateTrigger: 'onSubmit',
		},
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}

				return Promise.reject(
					new Error('Las dos contraseñas que ingresaste no coinciden')
				);
			},
		}),
	],
	subject: [
		{
			required: true,
			message: 'Completa el campo',
		},
		{
			min: 8,
			message: 'Mínimo de 8 caracteres',
			validateTrigger: 'onSubmit',
		},
		{
			whitespace: true,
			message: 'El campo está vacío',
			validateTrigger: 'onSubmit',
		},
	],
	message: [
		{
			required: true,
			message: 'Completa el campo',
		},
		{
			min: 15,
			message: 'Mínimo de 15 caracteres',
			validateTrigger: 'onSubmit',
		},
		{
			whitespace: true,
			message: 'El campo está vacío',
			validateTrigger: 'onSubmit',
		},
	],
};
