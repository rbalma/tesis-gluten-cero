import Notifications from "../models/notifications.js";
import { events } from "../utils/events.js";

// export const socketNotification = async (notificacion) => {
//   const { id_usuario_notificado } = notificacion;
//   try {
//     const io = getIO();
//     // Emitir evento "notificacion" al cliente
//     io.to(id_usuario_notificado).emit("notification", notificacion);
//   } catch (error) {
//     throw error; // Lanzamos el error para que se capture en la función principal
//   }
// };

export const createNotification = async (newNotifications, session) => {
  let description = "";
  try {
    const { event, recipeTitle, originUser } = newNotifications;

    if (event === events.RECIPE_VALUED)
      description = `${originUser} ha agregado una nueva valoración a la receta "${recipeTitle}"`;

    if (event === events.RECIPE_APPROVED)
      description = `La receta "${recipeTitle}" fue agregada a Gluten Cero y ya puede ser visitada por cualquier usuario.`;

    if (event === events.RECIPE_REJECTED)
      description = `Revisa la receta "${recipeTitle}" para que pueda ser agregada a Gluten Cero.`;

    newNotifications.description = description;
    const notification = new Notifications(newNotifications);
    await notification.save({ session });

    return notification;
  } catch (error) {
    throw error; // Lanzamos el error para que se capture en la función principal
  }
};
