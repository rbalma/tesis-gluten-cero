import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import styles from './Step.module.css';

export const StepAddItem = () => {
  
  return (
    <>
    <label>Ingresa cada uno de los ingredientes:</label>
    <Form.List
    name="ingredients"
    rules={[
      {
        validator: async (_, names) => {
          if (!names || names.length < 2) {
            return Promise.reject(new Error('Debe ingresar al menos 2 ingredientes'));
          }
        },
      },
    ]}
  >
    {(fields, { add, remove }, { errors }) => (
      <>
        {fields.map((field, index) => (
          <Form.Item
            required={false}
            key={field.key}
          >
            <Form.Item
              {...field}
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Ingresa un ingrediente o elimina este campo",
                },
              ]}
              noStyle
            >
              <Input
                style={{
                  width: '85%',
                }}
              />
            </Form.Item>
            {fields.length > 1 ? (
              <MinusCircleOutlined
                className={styles.dynamicDeleteButton}
                onClick={() => remove(field.name)}
              />
            ) : null}
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            onClick={() => add()}
            style={{
              width: '100%',
            }}
            icon={<PlusOutlined />}
          >
            Agregar ingrediente
          </Button>
          <Form.ErrorList errors={errors} />
        </Form.Item>
      </>
    )}
  </Form.List>
  </>
  )
}
