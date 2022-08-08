import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundScreen.module.css";

const NotFoundScreen = () => {
  return (
    <section className={styles.page_404}>
      <div className={styles.flex}>
      <div className={styles.four_zero_four_bg}>
        <h1>404</h1>
      </div>
      <div className={styles.contant_box_404}>
        <h3>Parece que estás perdido</h3>

        <p>La página que estás buscando no está disponible</p>

        <Link to={"/"} className={styles.link_404}>
          Ir a la página principal
        </Link>
      </div>
      </div>
    </section>
  );
};

export default NotFoundScreen;
