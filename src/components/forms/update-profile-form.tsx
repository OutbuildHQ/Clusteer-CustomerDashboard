
"use client";

import { deleteUserAccount, updateUser } from "@/lib/api/user/actions";
import { UpdateProfileFormSchema } from "@/lib/validation";
import { useUser } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import UploadAvatar from "../upload-avatar";

export type UpdateProfileFormData = z.infer<typeof UpdateProfileFormSchema>;

export default function UpdateProfileForm() {
	const user = useUser();

	const [avatarImage, setAvatarImage] = useState<File>(null!);

	const handleImageSelect = useCallback((file: File) => {
		setAvatarImage(file);
	}, []);

	const queryClient = useQueryClient();

	const { isPending: isUpdating, mutate: updateProfile } = useMutation({
		mutationFn: updateUser,
		onMutate: async (newUser) => {
			await queryClient.cancelQueries({ queryKey: ["user"] });

			const prevUser = queryClient.getQueryData(["user"]);

			queryClient.setQueryData(["user"], newUser);

			return { prevUser };
		},
		onError: (err, updatedTodo, context) => {
			queryClient.setQueryData(["user"], context?.prevUser);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const { isPending: isDeleting, mutate: deleteAccount } = useMutation({
		mutationFn: deleteUserAccount,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});

	const form = useForm<UpdateProfileFormData>({
		mode: "onChange",
		resolver: zodResolver(UpdateProfileFormSchema),
		defaultValues: {
			displayName: `${user?.firstName} ${user?.lastName}`,
			username: user?.username,
			email: user?.email,
			phoneNo: user?.phone,
			// ...data,
		},
	});

	const isBusy = isDeleting || isUpdating;
	const isFormInvalid = !form.formState.isValid;

	const onSubmit = (values: UpdateProfileFormData) => {
		const updatePayload: Parameters<typeof updateUser>[0] = {
			profile: values,
			avatar: null,
		};

		if (avatarImage) {
			const formData = new FormData();
			formData.append("avatar", avatarImage);
			updatePayload.avatar = formData;
		}

		updateProfile(updatePayload, {
			onSuccess: () => {
				form.reset(values);
				setAvatarImage(null!);
			},
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-y-4.5 lg:gap-5"
			>
				<FormField
					control={form.control}
					name="displayName"
					render={({ field }) => (
						<FormItem className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-8 pb-5 border-b border-[#E9EAEB]">
							<FormLabel className="font-semibold text-[#414651] gap-x-0.5 shrink-0 lg:max-w-[280px] w-full">
								Display Name <span className="text-[#008000]">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="h-11 border border-[#D5D7DA] rounded-full text-[#181D27] py-2.5 px-3.5 shadow-[0px_1px_2px_0px_#0A0D120D] lg:max-w-[512px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-8 pb-5 border-b border-[#E9EAEB]">
							<FormLabel className="font-semibold text-[#414651] gap-x-0.5 lg:max-w-[280px] w-full">
								Username <span className="text-[#008000]">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="h-11 border border-[#D5D7DA] rounded-full text-[#181D27] py-2.5 px-3.5 shadow-[0px_1px_2px_0px_#0A0D120D] lg:max-w-[512px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-8 pb-5 border-b border-[#E9EAEB]">
							<FormLabel className="font-semibold text-[#414651] gap-x-0.5 lg:max-w-[280px] w-full">
								Email <span className="text-[#008000]">*</span>
							</FormLabel>
							<FormControl>
								<div className="flex w-full gap-x-2 items-center h-11 py-2.5 px-3.5 border border-[#D5D7DA] rounded-full text-[#181D27] shadow-[0px_1px_2px_0px_#0A0D120D] overflow-hidden lg:max-w-[512px]">
									<Mail
										size={20}
										stroke="#717680"
									/>
									<Input
										className="p-0 rounded-none h-full border-0 shadow-none"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneNo"
					render={({ field }) => (
						<FormItem className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-8 pb-5 border-b border-[#E9EAEB]">
							<FormLabel className="font-semibold text-[#414651] gap-x-0.5 lg:max-w-[280px] w-full">
								Phone number <span className="text-[#008000]">*</span>
							</FormLabel>
							<FormControl>
								<div className="flex w-full lg:max-w-[512px] gap-x-2 items-center h-11 py-2.5 px-3.5 border border-[#D5D7DA] rounded-full text-[#181D27] shadow-[0px_1px_2px_0px_#0A0D120D] overflow-hidden">
									<Image
										src="/assets/icons/phone-call.svg"
										alt="phone icon"
										width={20}
										height={20}
									/>
									<Input
										type="tel"
										className="p-0 rounded-none h-full border-0 shadow-none"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<UploadAvatar
					username={user?.username}
					currentAvatar={
						avatarImage ? URL.createObjectURL(avatarImage) : user!.avatar
					}
					onImageSelect={handleImageSelect}
				/>

				<div className="flex flex-col items-center lg:flex-row gap-y-4 lg:gap-x-8 pb-5 border-b border-[#E9EAEB]">
					<span className="font-semibold lg:max-w-[280px] w-full text-[#414651] gap-x-0.5 text-sm">
						User ID
					</span>
					<div className="flex gap-x-2 py-2.5 px-11.5 ml-auto">
						<span>{user!.id}</span>
						<button className="shrink-0">
							<Image
								src="/assets/icons/copy.svg"
								alt="copy icon"
								width={18}
								height={18}
							/>
						</button>
					</div>
				</div>
				<div className="flex  items-center flex-col lg:flex-row gap-y-4 lg:gap-x-8 pb-5 border-b border-[#E9EAEB]">
					<span className="font-semibold lg:max-w-[280px] w-full text-[#414651] gap-x-0.5 text-sm">
						Registration date
					</span>
					<div className="py-2.5 px-11.5 ml-auto">
						{" "}
						{new Date(user!.dateJoined).getFullYear()}
					</div>
				</div>
				<div className="flex">
					<Button
						type="button"
						onClick={() => deleteAccount()}
						variant="link"
						className="p-0 text-sm text-destructive font-semibold"
						disabled={isBusy}
					>
						Close account
					</Button>
					<div className="ml-auto flex gap-x-3">
						<Button
							variant="outline"
							disabled={isBusy}
							className="p-0 text-sm text-[#414651] font-semibold h-10 px-3.5"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="outline"
							disabled={!form.formState.isDirty || isFormInvalid || isBusy}
							className="p-0 text-sm font-semibold h-10 px-3.5 gradient-border bg-[#11C211] border-[#0a0d120d] text-white"
						>
							{isUpdating ? "Saving..." : "Save"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
