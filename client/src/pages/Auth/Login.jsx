 import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logoGlutenCero.png";

import styles from "./Login.module.css";

export const Login = () => {
  const onSubmit = async (values) => {
    setIsLoading(true);
    //await sleep(1000);
    console.log({ values });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img src={Logo} alt="glutenCeroLogo" width={180} />
          </div>

          <p className={styles.title}>Ingresa tus datos:</p>

          <Form
            layout="vertical"
            onFinish={onSubmit}
            requiredMark={false}
            validateTrigger="onSubmit"
            autoComplete="off"
          >
            <Form.Item
              name="usuario"
              rules={[
                {
                  required: true,
                  message: "El correo es obligatorio",
                },
              ]}
            >
              <Input placeholder="Correo" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "La contraseña es obligatoria",
                },
              ]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>

            <button
              //disabled={isLoading && true}
              type="submit"
              className={styles.btnLogin}
            >
              {/* {isLoading ? "Ingresando..." : "Ingresar"} */}
              Iniciar Sesión
            </button>

            <div className={styles.footer}>
              <hr className={styles.dotted} />
              <button
                //disabled={isLoading && true}
                type="submit"
                className={`${styles.btnLogin} ${styles.btnGoogle}`}
              >
                {/* {isLoading ? "Ingresando..." : "Ingresar"} */}
                Ingresar con Google
              </button>
              <small>
                <Link to={"/password-perdida"} className={styles.link}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </small>
              <small>
                ¿Eres nuevo en Gluten Cero?{" "}
                <Link to={"/registro"} className={styles.link}>
                  Únete ahora{" "}
                </Link>
              </small>
            </div>
          </Form>
        </div>

        <div className={styles.sideImage}></div>
      </div>
    </div>
  );
};
