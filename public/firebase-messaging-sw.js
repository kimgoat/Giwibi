// // 이 줄들은 서비스 워커 내부에서만 실행됩니다
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// firebase.initializeApp({
//     apiKey: "AIzaSyCrCkKggdem2rMSQsaDBwfES95iWS7414k",
//     authDomain: "giwibi.firebaseapp.com",
//     projectId: "giwibi",
//     storageBucket: "giwibi.appspot.com",
//     messagingSenderId: "101205248599",
//     appId: "1:101205248599:web:3782b13ffebac3c053b112",
//     measurementId: "G-2QER5YE4M0",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message:', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/logo192.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

