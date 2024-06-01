const webPush = require("web-push");
const { WebSubscription } = require("../models/websubscriptions");
const vapidKeys = {
  publicKey: process.env.YOUR_PUBLIC_VAPID_KEY,
  privateKey: process.env.YOUR_PRIVATE_VAPID_KEY,
};

webPush.setVapidDetails(
  "mailto:nikhil@theshopbusiness.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

async function sendPushNotification(message, firmId, designationId) {
  try {
    // Retrieve subscriptions with the specified role from the database
    const subscriptions = await WebSubscription.findAll({
      where: { firmId, designationId },
    });

    for (const subscription of subscriptions) {
      const pushSubscription = {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      };

      try {
        await webPush.sendNotification(
          pushSubscription,
          JSON.stringify(message)
        );
        console.log(
          `Push notification sent to ${subscription.endpoint}, ---`,
          pushSubscription
        );
      } catch (error) {
        console.error(
          `Error sending push notification to ${subscription.endpoint}`,
          error
        );
      }
    }
  } catch (error) {
    console.error("Error retrieving subscriptions from database", error);
  }
}

module.exports = { webPush, sendPushNotification };
