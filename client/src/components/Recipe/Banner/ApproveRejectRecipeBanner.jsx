import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { ModalRejectRecipes } from '@/components/AdminDashboard/RecipesAdmin/ModalRejectRecipes';

import styles from './RecipeAlert.module.css';

export const ApproveRejectRecipeBanner = () => {
  return (
    <div className={styles.bannerContainer}>
    <div className={styles.mainInfo}>
      <div className={styles.iconDerivar}>
        <CheckCircleFilled style={{ fontSize: 25 }} />
      </div>

      <div className={styles.content}>
        <h4
          className={styles.title}
        >
          Receta pendiente de aprobar
        </h4>{' '}
        <div className={styles.subtitle}>
        Al aprobar la receta aparecerá visible para todos los usuarios
        </div>
      </div>
    </div>

    <div className={styles.btnGroup}>
      {/* <Button
        ghost
        style={{ marginRight: 17 }}
      >
        Rechazar
      </Button> */}
      <ModalRejectRecipes size='middle' />
      <Button
        className='success-dark'
      >
        Aprobar
      </Button>
    </div>
  </div>

  )
}
