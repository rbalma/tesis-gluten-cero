import { format } from 'date-fns'
import ESLocale from 'date-fns/locale/es';
import { noticeGetImage } from '@/utils/fetchData';

import styles from './NoticesCard.module.css';

export const NoticesCard = ({ notice }) => {
  const date = new Date( notice.date);

  return (
    <div className={styles.card} style={{ 
      backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.80)
      ), url(${ noticeGetImage(notice.image) })` 
    }}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{notice.title}</h2>
        <div className={styles.footer}>
        <time className={styles.subtitle}>Publicado el { format( date, 'PPP', { locale: ESLocale }) }</time>
        <button className={styles.openNotice}>Abrir</button>
        </div>
      </div>
    </div>
  )
}
