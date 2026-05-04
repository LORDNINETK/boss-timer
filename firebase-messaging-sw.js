importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC9b8i1-UptVKW1Jh98_rgMY0tbvfDziio",
  authDomain: "boss-timer-803c1.firebaseapp.com",
  databaseURL: "https://boss-timer-803c1-default-rtdb.firebaseio.com",
  projectId: "boss-timer-803c1",
  storageBucket: "boss-timer-803c1.appspot.com",
  messagingSenderId: "584405925759",
  appId: "1:584405925759:web:9356c4d41c58bf181644a",
});

const messaging = firebase.messaging();
const APP_URL = "/boss-timer/index1.html";

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(APP_URL) && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(APP_URL);
        }

        return null;
      }),
  );
});

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notification = payload.notification || {};
  const data = payload.data || {};

  self.registration.showNotification(data.title || notification.title || "Boss Alert", {
    body: data.body || notification.body || "A boss timer alert is ready.",
    icon: "/boss-timer/logo.png",
    badge: "/boss-timer/logo.png",
    tag: data.tag || payload.fcmMessageId || "boss-alert",
    renotify: true,
  });
});
