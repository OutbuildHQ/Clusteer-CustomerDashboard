import axios from "axios";

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const getAuthToken = () => {
	// Check if we're in the browser (client-side)
	if (typeof window !== "undefined") {
		return document.cookie
			.split("; ")
			.find((row) => row.startsWith("auth_token="))
			?.split("=")[1];
	}
	return null; // Return null or handle as needed on server-side
};

// Request interceptor to add the Bearer token to headers
apiClient.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default apiClient;
