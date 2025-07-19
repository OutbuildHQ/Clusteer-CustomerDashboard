"use client";

import { UpdateProfileFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarImage } from "@radix-ui/react-avatar";
import { CircleQuestionMark, CloudUpload, Mail } from "lucide-react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar } from "../ui/avatar";
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

type UpdateProfileFormType = z.infer<typeof UpdateProfileFormSchema>;

export default function UpdateProfileForm() {
	const form = useForm<UpdateProfileFormType>({
		resolver: zodResolver(UpdateProfileFormSchema),
		defaultValues: {
			displayName: "Olivia",
			username: "@Olivia",
			email: "Olivia@gmail.com",
			phoneNo: "+2347013648409",
		},
	});

	const onSubmit = (values: FieldValues) => console.log(values);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-y-4.5 font-inter"
			>
				<FormField
					control={form.control}
					name="displayName"
					render={({ field }) => (
						<FormItem className="gap-4 pb-5 border-b border-[#E9EAEB]">
							<FormLabel className="font-semibold text-[#414651] gap-x-0.5">
								Display Name <span className="text-[#008000]">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="h-11 border border-[#D5D7DA] rounded-full text-[#181D27] py-2.5 px-3.5 shadow-[0px_1px_2px_0px_#0A0D120D]"
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
						<FormItem className="gap-4 pb-5 border-b border-[#E9EAEB]">
							<FormLabel className="font-semibold text-[#414651] gap-x-0.5">
								Username <span className="text-[#008000]">*</span>
							</FormLabel>
							<FormControl>
								<Input
									className="h-11 border border-[#D5D7DA] rounded-full text-[#181D27] py-2.5 px-3.5 shadow-[0px_1px_2px_0px_#0A0D120D]"
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
						<FormItem className="gap-4 pb-5 border-b border-[#E9EAEB]">
							<FormLabel className="font-semibold text-[#414651] gap-x-0.5">
								Email <span className="text-[#008000]">*</span>
							</FormLabel>
							<FormControl>
								<div className="flex gap-x-2 items-center h-11 py-2.5 px-3.5 border border-[#D5D7DA] rounded-full text-[#181D27] shadow-[0px_1px_2px_0px_#0A0D120D] overflow-hidden">
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
						<FormItem className="gap-4 pb-5 border-b border-[#E9EAEB]">
							<FormLabel className="font-semibold text-[#414651] gap-x-0.5">
								Phone number <span className="text-[#008000]">*</span>
							</FormLabel>
							<FormControl>
								<div className="flex gap-x-2 items-center h-11 py-2.5 px-3.5 border border-[#D5D7DA] rounded-full text-[#181D27] shadow-[0px_1px_2px_0px_#0A0D120D] overflow-hidden">
									<Image
										src="/assets/icons/phone.svg"
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
				<FormField
					control={form.control}
					name="profileImage"
					render={() => (
						<FormItem className="gap-4 pb-5 border-b border-[#E9EAEB]">
							<div>
								<FormLabel className="font-semibold text-[#414651] gap-x-0.5">
									Your Photo <span className="text-[#a8faa8]">*</span>{" "}
									<CircleQuestionMark
										stroke="#A4A7AE"
										strokeWidth={2}
										size={16}
									/>
								</FormLabel>
								<FormDescription className="text-[#535862]">
									This will be displayed on your profile.
								</FormDescription>
							</div>
							<div className="flex gap-x-5 justify-center">
								<Avatar className="size-16 border-[0.75px] border-[#00000014]">
									<AvatarImage src="https://github.com/shadcn.png" />
								</Avatar>
								<FormControl>
									<div className="relative flex flex-col justify-center items-center border-2 border-[#A6E615] w-full rounded-[12px] py-4 px-6 text-sm text-center max-w-[428px]">
										<div className="p-2.5 size-10 border border-[#E9EAEB] rounded-xl shadow-[0px_1px_2px_0px_#0A0D120D]">
											<CloudUpload
												size={20}
												stroke="#414651"
											/>
										</div>
										<div className="flex item-center">
											<div>
												<p className="mt-3 text-[#535862]">
													<span className="text-[#008000] font-semibold">
														Click to upload
													</span>{" "}
													or drag and drop
												</p>
												<p className="mt-1 text-[#535862]">
													SVG, PNG, JPG or GIF (max. 800x400px)
												</p>
											</div>
											<div className="relative h-fit">
												<Image
													className="size-10"
													src="/assets/icons/file.svg"
													alt="file icon"
													width={40}
													height={40}
												/>
												<Image
													className="absolute left-0 bottom-1.5"
													src="/assets/icons/file-type-icon.svg"
													alt="file type icon"
													width={26}
													height={16}
												/>
											</div>
										</div>
										<input
											type="file"
											className="hidden"
											// {...field}
										/>
									</div>
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
