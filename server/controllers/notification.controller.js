import ErrorResponse from "../utils/errorResponse.js";
import Notifications from "../models/notifications.js";
import webPushSubscription from "../models/webPushSubscription.js";
import webpush from '../utils/webpush.js';


// @desc Obtener una o más notificaciones
// @route GET /api/notifications, /api/notifications/:notificationId
// @access Private
export const getNotification = async (req, res, next) => {
  const { page = 1, limit = 10, userId } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { createdAt: -1 },
    populate: [
      {
        path: "originUser",
        select: "name lastname avatar",
      },
      {
        path: "notifiedUser",
        select: "name lastname avatar",
      },
      {
        path: "recipe",
        select: "_id title",
      },
    ],
  };

  try {
    const filters = {};
    if (userId) filters.notifiedUser = userId;

    const notifications = await Notifications.paginate(filters, options);

    const payload = JSON.stringify({
      title: 'Nueva notificación',
      message: 'El web push funciona!!!',
    });

    const data = await webPushSubscription.findOne(
      { user: userId }, 'endpoint p256dh auth',
      { sort: { createdAt: -1 } }
    );

    if (data) {
      const pushSubscripton = {
        endpoint: data.endpoint,
        keys: {
          p256dh: data.p256dh,
          auth: data.auth,
        },
      };
     
      await webpush.sendNotification(pushSubscripton, payload);
 
    }

    res.json({
      notifications: notifications.docs,
      totalPages: notifications.totalPages,
      count: notifications.totalDocs,
      payload
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Agregar una nueva notificación
// @route POST /api/notifications
// @access Private
export const addNotification = async (req, res, next) => {
  try {
    req.body.userSends = req.id;
    const newNotification = new Notifications(req.body);
    const notification = await newNotification.save();

    res.json({ notification, message: "Notificación creada" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc Actualizar una notificación
// @route PUT /api/notifications/:notificationId
// @access Private
export const updateNotification = async (req, res, next) => {
  const { notificationId } = req.params;
  try {
    const notificationUpdated = await Notifications.findByIdAndUpdate(
      notificationId,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      notification: notificationUpdated,
      message: "Notificación actualizada",
    });
  } catch (error) {
    next(error);
  }
};

// @desc Eliminar una notificación
// @route DELETE /api/notifications/:notificationId
// @access Private
export const deleteNotification = async (req, res, next) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notifications.findById(notificationId);
    if (!notification)
      throw new ErrorResponse("La notificación no existe", 404);

    await Notifications.findByIdAndDelete(notificationId);

    res.json({ data: notificationId, message: "Notificación eliminada" });
  } catch (error) {
    next(error);
  }
};

// @desc Obtener la cantidad de notificaciones no leídas por un usuario
// @route GET /api/notifications/unread/user/:userId
// @access Private
export const getUnreadNotifications = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const countUnread = await Notifications.count({
      notifiedUser: userId,
      read: false,
    });
    res.json({ count: countUnread });
  } catch (error) {
    next(error);
  }
};

// @desc Marca todas las notificaciones de un usuario como leídas
// @route PATCH /api//notifications/unread/user/:userId
// @access Private
export const checkAllNotification = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await Notifications.updateMany(
      { notifiedUser: userId },
      { read: true }
    );
    res.json({
      ok: true,
      message: "Notificaciones marcadas como leídas",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc Marca o desmarca una notificación como leída
// @route PATCH /api/notifications/:notificationId
// @access Private
export const checkOrUncheckNotification = async (req, res, next) => {
  const { notificationId } = req.params;
  const { read } = req.body;
  try {
    await Notifications.findByIdAndUpdate(notificationId, { read });
    res.json({
      notificationId,
      message: "Notificación marcada como leída",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
  @desc Suscribe al usuario al servicio de notificaciones push
  @route POST /api/subscription
  @access Private
*/
export const createSubscription = async (req, res, next) => {
  try {
   const pushSubscripton = req.body;

    const auth = await webPushSubscription.findOne({ auth: pushSubscripton.keys.auth } );
    if (!auth) await webPushSubscription.create({ 
      endpoint: pushSubscripton.endpoint,
      p256dh: pushSubscripton.keys.p256dh,
      auth: pushSubscripton.keys.auth,
      user: req.id
     });

   // console.log({ pushSubscripton });
    res.status(201).json({ message: 'subscribe' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
  @desc Elimina al usuario del servicio de notificaciones push
  @route DELETE /api/subscription/:authId
  @access Private
*/
export const deleteSubscription = async (req, res, next) => {
  try {
    const { authId } = req.params;

    await webPushSubscription.deleteOne({ auth: authId });

    res.json({ message: "unsubscribe" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};