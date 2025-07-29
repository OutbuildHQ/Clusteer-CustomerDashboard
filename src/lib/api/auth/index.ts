import { LoginFormType } from "@/components/forms/login-form";
import axios, { AxiosError } from "axios";

export async function loginUser(payload: LoginFormType) {
	try {
		const res = await axios.post("/api/auth/login", payload);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
