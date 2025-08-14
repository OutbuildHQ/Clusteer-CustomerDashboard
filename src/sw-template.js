importScripts(
	"https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Firebase configuration
const firebaseConfig = {
	apiKey: "__FIREBASE_API_KEY__",
	authDomain: "__FIREBASE_AUTH_DOMAIN__",
	projectId: "__FIREBASE_PROJECT_ID__",
	storageBucket: "__FIREBASE_STORAGE_BUCKET__",
	messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
	appId: "__FIREBASE_APP_ID__",
	measurementId: "__FIREBASE_MEASUREMENT_ID__",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

self.addEventListener("push", (event) => {
	let data = {};

	if (event.data) {
		try {
			data = event.data.json();
		} catch (e) {
			console.error("Error parsing push data", e);
		}
	}

	const title = data.notification?.title || data.data?.title || "Default Title";
	const options = {
		body:
			data.notification?.body || data.data?.body || "You have a new message",
		icon: data.notification?.icon || "/default-icon.png",
		data: data.data || {},
	};

	console.log("Push received:", data);

	event.waitUntil(self.registration.showNotification(title, options));
});

// Handle background messages
messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message:",
		payload
	);

	const notificationTitle =
		payload.notification?.title || "Background Notification";
	const notificationOptions = {
		body: payload.notification?.body || "You have a new message!",
		icon: payload.notification?.icon || "/assets/icons/logo.svg",
	};

	console.count("onBackgroundMessage");
	self.registration.showNotification(notificationTitle, notificationOptions);
});
