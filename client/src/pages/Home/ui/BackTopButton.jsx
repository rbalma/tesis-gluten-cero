import { BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

import styles from './BackTopButton.module.css';

export const BackTopButton = () => {
  return (
    <BackTop>
    <div className={styles.backTop}>
      <ArrowUpOutlined />
    </div>
  </BackTop>
  )
}
