import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { PoweroffOutlined, MenuOutlined } from "@ant-design/icons";
import Logo from "@/assets/images/logoBlanco.png";
import useAuthStore from "@/store/authStore";

import styles from './TopBar.module.css';

export const TopBar = ({ showDrawer }) => {
  const {	removeUser } = useAuthStore();
  const navigate = useNavigate();

  const logoutUser = () => {
    removeUser();
    navigate('/');
  };

  return (
    <div className={styles.menuTop}>
      <div>
        <Button type="link" className={styles.btnMenu}>
          <MenuOutlined onClick={showDrawer} />
        </Button>

        <Link to="/">
          <img width={80} src={Logo} alt="Gluten-Cero" />
        </Link>
      </div>
    
      <Button icon={<PoweroffOutlined />} shape='circle' type='link' danger onClick={logoutUser} />

    </div>
  );
}
