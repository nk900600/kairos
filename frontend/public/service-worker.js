console.log("Service Worker script loaded");

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  event.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  console.log("Push event received");
  const data = event.data
    ? event.data.json()
    : { title: "No title", body: "No body" };

  const options = {
    body: data.body,
    icon: "https://kairos-public-images.s3.eu-north-1.amazonaws.com/tsb-192.png",
    data: {
      url: "https://app.theshopbusiness.com",
    },
  };
  event.waitUntil(
    self.registration
      .showNotification(data.title, options)
      .then(() => {
        console.log("Notification displayed");
      })
      .catch((err) => {
        console.error("Notification display error:", err);
      })
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received");
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clients.openWindow && event.notification.data.url) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});
