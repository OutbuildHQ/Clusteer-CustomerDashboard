"use client";

import useFCMToken from "@/hooks/use-fcm-token";

//TODO: Refactor Later

export default function NotificationPermission() {
	useFCMToken();
	return null;
}
