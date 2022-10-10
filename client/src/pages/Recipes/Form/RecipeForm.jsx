import { useState, useEffect } from 'react';
import { Steps, Result, Button, message, Form } from 'antd';
import {
	FileImageOutlined,
	UnorderedListOutlined,
	OrderedListOutlined,
	CheckSquareOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from './RecipeForm.module.css';
import { StepForm } from './steps/StepForm';
import { StepAddItem } from './steps/StepAddItem';

const { Step } = Steps;

export const RecipeForm = () => {
	//const { userProfile: user } = useAuthStore();
	const [current, setCurrent] = useState(0);
	const [error, setError] = useState(false);
	const [form] = Form.useForm();

	const steps = [
		{
			title: 'Datos',
			icon: <FileImageOutlined />,
			content: <StepForm />,
		},
		{
			title: 'Ingredientes',
			icon: <UnorderedListOutlined />,
			content: <StepAddItem />,
		},
		{
			title: 'Proceso',
			icon: <UnorderedListOutlined />,
			content: <StepAddItem />,
		},
		{
			title: 'Completado',
			icon: <CheckSquareOutlined />,
			content: (
				<Result
					style={{ minHeight: '350px', paddingTop: '50px' }}
					status='success'
					title={'¡Receta creada!'}
					subTitle='Espere a que sea aprobada por los administradores para verla publicada en la web'
					extra={
						<Button type='primary' key='console'>
							<Link to='/'>Ir a la página principal</Link>
						</Button>
					}
				/>
			),
		},
	];

	// const steps = [
	//   {
	//     title: 'Datos',
	//     icon: <FileImageOutlined />,
	//     content: <TitleImage
	//     nextStep={nextStep}
	//     setRecipe={setRecipe}
	//     recipe={recipe}
	//     setError={setError}
	//     avatar={avatar}
	//     setAvatar={setAvatar}
	//   />,
	//   },
	//   {
	//     title: 'Ingredientes',
	//     icon: <UnorderedListOutlined />,
	//     content: <CategoryIngredients
	//     nextStep={nextStep}
	//     prevStep={prevStep}
	//     setRecipe={setRecipe}
	//     recipe={recipe}
	//     setError={setError}
	//   />,
	//   },
	//   {
	//     title: 'Proceso',
	//     icon: <OrderedListOutlined />,
	//     content: <Descriptions
	//     addRecipe={addRecipe}
	//     prevStep={prevStep}
	//     loading={loading}
	//     setRecipe={setRecipe}
	//     recipe={recipe}
	//     setError={setError}
	//   />,
	//   },
	//   {
	//     title: 'Completado',
	//     icon: <CheckSquareOutlined />,
	//     content:  <Result
	//     style={{minHeight: '350px', marginTop:'50px'}}
	//     status="success"
	//     title={id ? "¡Receta actualizada!" : "¡Receta creada!"}
	//     subTitle="Espere a que sea aprobada por los administradores para verla publicada en la web"
	//     extra={!id &&
	//       <Button type="primary" key="console">
	//         <Link to='/'>
	//         Ir a la página principal
	//         </Link>
	//       </Button>
	//     }
	//   />,
	//   }
	// ];

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	return (
		<div className={styles.formulario}>
      <div>
			<Steps current={current} status={error ? 'error' : 'process'}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
      </div>

			<Form layout='vertical' autoComplete="off" form={form}>
			<div className={styles.formContainer}>{steps[current].content}</div>

			<div className={styles.divBtn}>
				{current > 0 && (
					<Button
						style={{
							margin: '0 8px',
						}}
						onClick={() => prev()}
					>
						Atrás
					</Button>
				)}

				{current < steps.length - 1 && (
					<Button type='primary' onClick={() => next()}>
						Siguiente
					</Button>
				)}

				{current === steps.length - 1 && (
					<Button
						type='primary'
						onClick={() =>
							console.log({ values: form.getFieldsValue(true) })
						}
					>
						Confirmar
					</Button>
				)}
			</div>
			</Form>

		</div>
	);
};

// initialValues={{ image: [
// 	{
// 		uid: '1',
// 		name: 'receta',
// 		status: 'done',
// 		url: 'https://res.cloudinary.com/glute/image/upload/v1665420580/recipes/kgeup6sgvoumlfnncnej.jpg',
// 	},
// ], title: 'hola', ingredients: ['pera', 'manzana', 'banana'] }} 