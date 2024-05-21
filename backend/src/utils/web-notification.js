const webPush = require("web-push");
const vapidKeys = {
  publicKey: process.env.YOUR_PUBLIC_VAPID_KEY,
  privateKey: process.env.YOUR_PRIVATE_VAPID_KEY,
};

webPush.setVapidDetails(
  "mailto:test@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions = [];

module.exports = { webPush, subscriptions };
