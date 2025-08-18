"use client";

import { loginUser } from "@/lib/api/auth";
import { LoginFormSchema } from "@/lib/validation";
import { useUserActions } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "../password-input";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
	const form = useForm<LoginFormType>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { setUser } = useUserActions();

	const router = useRouter();

	const { isPending, mutate } = useMutation({
		mutationFn: loginUser,
		onSuccess: (res) => {
			if (res.message === "Please enter OTP") {
				setUser(res.data);
				router.push("/verify-otp");
			} else router.push("/");
		},
	});

	const onSubmit = (data: LoginFormType) => {
		mutate(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-y-5 w-full p-5 form-border rounded-2xl"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="gap-1.5">
							<FormLabel className="font-medium">Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									className="h-11"
									placeholder="Enter your email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="gap-1.5">
							<FormLabel className="font-medium">Password</FormLabel>
							<FormControl>
								<PasswordInput {...field} />
							</FormControl>
							<FormDescription className="text-left text-black text-sm font-lexend">
								Must be at least 8 characters.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					disabled={isPending}
					className="mt-1 font-mona border-black text-[#111111] bg-light-green border font-semibold text-base shadow-xs hover:bg-muted"
				>
					{isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Logging In...
						</>
					) : (
						<>Login</>
					)}
				</Button>
				<div className="text-center mt-3">
					Don’t have an account?
					<Link href="/signup">
						<span className="text-dark-green font-semibold ml-1">Sign up</span>
						<ChevronRight className="inline-block size-5 stroke-dark-green ml-2" />
					</Link>
				</div>
			</form>
		</Form>
	);
}
