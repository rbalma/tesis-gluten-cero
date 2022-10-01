import {
	UserOutlined,
	CommentOutlined,
	ClockCircleOutlined,
	TagOutlined,
} from '@ant-design/icons';

import styles from './CardRecipeDetail.module.css';

export const CardRecipeDetail = () => {
  return (
    <div className={styles.detailsRecipe}>
    <img
      className={styles.image}
      src='https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg'
      alt='Imagen receta'
      width='100%'
      height='auto'
    />

    <div className={styles.body}>
      <div className={styles.title}>Lorem ipsum dolor sit amet</div>

      <div className={styles.info}>
        <span>
          {' '}
          <UserOutlined /> Rodrigo Balmaceda
        </span>
        <span>
          {' '}
          <TagOutlined /> Sopas
        </span>
        <span>
          {' '}
          <ClockCircleOutlined /> 28 de Septiembre 2021
        </span>
        <span>
          {' '}
          <CommentOutlined /> 25 comentarios
        </span>
      </div>

      <article style={{ marginTop: '40px' }}>
        <h3 className={styles.ingredientsTitle}>Ingredientes</h3>
        <ul className={styles.ingredientsList}>
          <li className={styles.ingredientsItems}>
            Those who say it cannot be done should not interrupt those busy
            proving them right.
          </li>
          <li className={styles.ingredientsItems}>
            Those who say it cannot be done should not interrupt those busy
            proving them right.
          </li>
          <li className={styles.ingredientsItems}>
            Those who say it cannot be done should not interrupt those busy
            proving them right.
          </li>
        </ul>
      </article>

      <article style={{ marginTop: '40px' }}>
        <h3 className={styles.ingredientsTitle}>Preparación</h3>
        <ol className={styles.stepsList}>
          <li className={styles.stepsListitem}>
            Those who say it cannot be done should not interrupt those busy
            proving them right.
          </li>
          <li className={styles.stepsListitem}>
            Those who say it cannot be done should not interrupt those busy
            proving them right. Those who say it cannot be done should not
            interrupt those busy proving them right.
          </li>
          <li className={styles.stepsListitem}>
            Those who say it cannot be done should not interrupt those busy
            proving them right.
          </li>
        </ol>
      </article>
    </div>
  </div>
  )
}
