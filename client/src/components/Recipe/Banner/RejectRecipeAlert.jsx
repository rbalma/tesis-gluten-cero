import { Alert } from "antd"

export const RejectRecipeAlert = () => {
  return (
    <Alert
    message="Receta Rechazada"
    description="La receta contiene errores de ortografía."
    type="error"
    showIcon
  />
  )
}
