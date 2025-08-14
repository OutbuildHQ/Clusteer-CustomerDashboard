"use client";

import { messaging } from "@/lib/firebase";
import { getToken, isSupported } from "firebase/messaging";
import { useEffect, useState } from "react";
import useNotificationPermission from "./use-notification-permission";
import useServiceWorker from "./use-service-worker";
import { updateFCMToken } from "@/lib/api/notification/actions";

const useFCMToken = () => {
	const permission = useNotificationPermission();
	const registration = useServiceWorker();
	const [fcmToken, setFcmToken] = useState<string | null>(null);

	useEffect(() => {
		const retrieveToken = async () => {
			if (typeof window === "undefined") return;
			if (permission !== "granted" || !registration) return;

			const isFCMSupported = await isSupported();
			if (!isFCMSupported) {
				console.error(
					"Firebase Cloud Messaging is not supported in this browser."
				);
				return;
			}

			try {
				const token = await getToken(messaging(), {
					vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
					serviceWorkerRegistration: registration,
				});

				if (!token) {
					console.error("No FCM token retrieved.");
					return;
				}

				await updateFCMToken({ fcmToken: token });

				setFcmToken(token);
			} catch (err) {
				console.error("Error retrieving FCM token:", err);
			}
		};

		retrieveToken();
	}, [permission, registration]);

	return fcmToken;
};

export default useFCMToken;
