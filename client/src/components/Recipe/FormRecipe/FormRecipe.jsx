import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Progress } from 'antd';
import { IconArrowNarrowLeft } from '@/components/Icons';
import { StepDataRecipe, StepAddItem, StepSummaryRecipe } from './StepsForm';

import styles from './FormRecipe.module.css';

const stepDescription = {
	1: 'Últimos 3 Pasos',
	2: 'Últimos 2 Pasos',
	3: 'Último Paso',
	4: 'Último Paso',
};

export const FormRecipe = ({ setIsSuccessRecipe }) => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [percent, setPercent] = useState(33.3);
	const [current, setCurrent] = useState(1);
	const [isDisabledStepOne, setIsDisabledStepOne] = useState(true);
	const [isDisabledStepTwo, setIsDisabledStepTwo] = useState(true);
	const [isDisabledStepThree, setIsDisabledStepThree] = useState(true);

	const next = () => {
		setCurrent(current + 1);
		let newPercent = percent + 33.3;
		if (newPercent > 90) {
			newPercent = 100;
		}
		setPercent(newPercent);
	};

	const prev = () => {
		if (current === 1) return navigate('/recetas');
		setCurrent(current - 1);
		let newPercent = percent - 33.3;
		if (newPercent < 35) {
			newPercent = 33.3;
		}
		setPercent(newPercent);
	};

	const isDataComplete = (_, allFields) => {
		if (current === 1) {
			if (
				!!allFields.title?.trim() &&
				allFields.category &&
				allFields.performance &&
				allFields.preparationTime &&
				allFields.picture?.[0]
			) {
				setIsDisabledStepOne(false);
			} else {
				setIsDisabledStepOne(true);
			}
			return;
		}

		if (current === 2) {
			if (
				allFields.ingredients?.length > 1 &&
				Array.isArray(allFields.ingredients) &&
				!allFields.ingredients?.some((ing) => !ing?.trim().length)
			) {
				setIsDisabledStepTwo(false);
			} else {
				setIsDisabledStepTwo(true);
			}
			return;
		}

		if (current === 3) {
			if (
				current === 3 &&
				Array.isArray(allFields.instructions) &&
				allFields.instructions?.length > 1 &&
				!allFields.instructions?.some((ins) => !ins?.trim().length)
			) {
				setIsDisabledStepThree(false);
			} else {
				setIsDisabledStepThree(true);
			}
			return;
		}
	};

	return (
		<>
			<div className={styles.formRecipe}>
				<Form
					layout='vertical'
					autoComplete='off'
					preserve
					form={form}
					onValuesChange={isDataComplete}>
					<div style={{ display: current === 1 ? 'block' : 'none' }}>
						<h1 className={styles.titleFormRecipe}>
							Completa la Receta Libre de Gluten
						</h1>
						<StepDataRecipe />
					</div>

					<div style={{ display: current === 2 ? 'block' : 'none' }}>
						<h1 className={styles.titleFormRecipe}>
							Ingredientes de la Receta
						</h1>
						<div className={styles.contentFormRecipe}>
							<StepAddItem
								name='ingredients'
								single='ingrediente'
								plural='ingredientes'
							/>
						</div>
					</div>

					<div style={{ display: current === 3 ? 'block' : 'none' }}>
						<h1 className={styles.titleFormRecipe}>
							Instrucciones para realizar la Receta
						</h1>
						<div className={styles.contentFormRecipe}>
							<StepAddItem
								name='instructions'
								single='instrucción'
								plural='instrucciones'
							/>
						</div>
					</div>
				</Form>

				<div style={{ display: current === 4 ? 'block' : 'none' }}>
					<StepSummaryRecipe setCurrent={setCurrent} />
				</div>
			</div>

			<div className={styles.divBtn}>
				<div>
					<button className={styles.btnBack} onClick={() => prev()}>
						VOLVER
					</button>

					<span className={styles.stepInfoCount}>
						<strong>{stepDescription[current]}</strong> para crear Tu Receta
					</span>

					<button
						disabled={
							current === 1
								? isDisabledStepOne
								: current === 2
								? isDisabledStepTwo
								: isDisabledStepThree
						}
						className={styles.btnNext}
						onClick={() => next()}>
						CONTINUAR
					</button>
				</div>

				{current === 4 ? (
					<button
						className={styles.btnSubmit}
						onClick={() => setIsSuccessRecipe(true)}>
						Confirmar la Receta <IconArrowNarrowLeft />
					</button>
				) : null}
			</div>

			<Progress
				percent={percent}
				strokeLinecap='butt'
				strokeColor='#f91942'
				strokeWidth={7}
				className='progressBarRecipe'
				showInfo={false}
			/>
		</>
	);
};
