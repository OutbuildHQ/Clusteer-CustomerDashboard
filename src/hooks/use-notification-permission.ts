"use client";

import { useEffect, useState } from "react";
import { Toast } from "@/components/toast";

const useNotificationPermission = () => {
	const [permission, setPermission] =
		useState<NotificationPermission>("default");

	useEffect(() => {
		if (typeof window === "undefined") return;

		if (!("Notification" in window)) {
			console.error("This browser does not support notifications.");
			return;
		}

		const handlePermission = () => setPermission(Notification.permission);

		Notification.requestPermission().then((result) => {
			if (result !== "granted") {
				Toast.error("Notification permission not granted.");
				console.warn("Notification permission not granted.");
			}
			handlePermission();
		});

		navigator.permissions
			.query({ name: "notifications" })
			.then((notificationPerm) => {
				notificationPerm.onchange = handlePermission;
			})
			.catch((err) => {
				console.error("Error checking notification permission:", err);
			});
	}, []);

	return permission;
};

export default useNotificationPermission;
