import Notifications from "../models/notifications.js";

export const socketNotification = async (notificacion) => {
  const { id_usuario_notificado } = notificacion;
  try {
    const io = getIO();
    // Emitir evento "notificacion" al cliente
    io.to(id_usuario_notificado).emit("notification", notificacion);
  } catch (error) {
    throw error; // Lanzamos el error para que se capture en la función principal
  }
};

export const createNotification = async (newNotifications, session) => {
  try {
    const notification = new Notifications(newNotifications);
    await notification.save({ session });

    return notification;
  } catch (error) {
    throw error; // Lanzamos el error para que se capture en la función principal
  }
};
