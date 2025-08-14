"use client";

import { Toast } from "@/components/toast";
import { useEffect, useState } from "react";

const useServiceWorker = () => {
	const [registration, setRegistration] =
		useState<ServiceWorkerRegistration | null>(null);

	useEffect(() => {
		const registerSW = async () => {
			if (!("serviceWorker" in navigator)) {
				Toast.error("Service workers are not supported in this browser.");
				return;
			}

			if (navigator.serviceWorker.controller) {
				console.log("Service Worker already active — skipping registration.");
				setRegistration(await navigator.serviceWorker.ready);
				return;
			}

			try {
				const reg = await navigator.serviceWorker.register(
					"/firebase-messaging-sw.js"
				);
				console.log("Service Worker registered:", reg);
				setRegistration(reg);
			} catch (error) {
				console.error("Service Worker registration failed:", error);
			}
		};

		registerSW();
	}, []);

	return registration;
};

export default useServiceWorker;
