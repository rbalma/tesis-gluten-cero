import { useState, useEffect } from 'react';
import { Steps, Result, Button } from "antd";
import { FileImageOutlined, UnorderedListOutlined, OrderedListOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


import styles from './RecipeForm.module.css';

const { Step } = Steps;


export const RecipeForm = () => {
	//const { userProfile: user } = useAuthStore();
  const nextStep = () => {
    const { step } = recipe;
    setRecipe({ ...recipe, step: step + 1 });
  };

  const prevStep = () => {
    const { step } = recipe;
    setRecipe({ ...recipe, step: step - 1 });
  };

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

	return (
		<div className={styles.formulario}>
			<div className={styles.formContainer}>
				<Steps
					size='small'
					current={recipe.step}
					status={error ? 'error' : 'process'}
				>
					{/* {steps.map((item) => (
						<Step key={item.title} title={item.title} icon={item.icon} />
					))} */}
				</Steps>
				{/* {steps[recipe.step].content} */}
        Formulario
			</div>
		</div>
	);
};
