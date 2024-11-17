import webpush from "web-push";
const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

webpush.setVapidDetails(
  "https://glutencero.netlify.app/",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

export default webpush;