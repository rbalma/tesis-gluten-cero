import { Form, Input } from 'antd';
import { IconCirclePlus, IconX } from '@/components/Icons';

import styles from './Step.module.css';

export const StepAddItem = ({ name, single, plural }) => {
	return (
		<>
			<Form.List
				name={name}
				rules={[
					{
						validator: async (_, names) => {
							if (!names || names.length < 2) {
								return Promise.reject(
									new Error(`Debe ingresar al menos 2 ${plural}`)
								);
							}
						},
					},
				]}>
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field) => (
							<Form.Item required={false} key={field.key}>
								<Form.Item
									{...field}
									validateTrigger={['onChange', 'onBlur']}
									rules={[
										{
											required: true,
											whitespace: true,
											message: '',
										},
									]}
									noStyle>
									<Input
										style={{
											width: '93%',
										}}
									/>
								</Form.Item>
								{fields.length > 1 ? (
									<span
										className={styles.dynamicDeleteButton}
										onClick={() => remove(field.name)}>
										<IconX />
									</span>
								) : null}
							</Form.Item>
						))}
						<Form.Item>
							<button
								type='button'
								className={styles.addItemBtn}
								onClick={() => add()}>
								<IconCirclePlus size={22} strokeWidth={1.3}/> Agregar {single}
							</button>
							<Form.ErrorList errors={errors} />
						</Form.Item>
					</>
				)}
			</Form.List>
		</>
	);
};
