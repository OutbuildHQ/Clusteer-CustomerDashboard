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
import { Button } from "../ui/button";

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
				<FormField
					control={form.control}
					name="profileImage"
					render={() => (
						<FormItem className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-8 pb-5 border-b border-[#E9EAEB]">
							<div>
								<FormLabel className="font-semibold text-[#414651] gap-x-0.5 lg:w-[280px] shrink-0">
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
							<div className="flex gap-x-5 w-full max-w-[512px]">
								<Avatar className="size-16 border-[0.75px] border-[#00000014]">
									<AvatarImage src="https://github.com/shadcn.png" />
								</Avatar>
								<FormControl>
									<div className="relative flex flex-col items-center border-2 border-[#A6E615] w-full rounded-[12px] py-4 px-6 text-sm text-center">
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

				<div className="flex flex-col items-center lg:flex-row gap-y-4 lg:gap-x-8 pb-5 border-b border-[#E9EAEB]">
					<span className="font-semibold lg:max-w-[280px] w-full text-[#414651] gap-x-0.5 text-sm">
						User ID
					</span>
					<div className="flex gap-x-2 py-2.5 px-11.5 ml-auto">
						<span>1901191989</span>
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
					<div className="py-2.5 px-11.5 ml-auto">2022-03-10 15:33:21</div>
				</div>
				<div className="flex">
					<Button
						type="button"
						variant="link"
						className="p-0 text-sm text-destructive font-semibold"
					>
						Close account
					</Button>
					<div className="ml-auto flex gap-x-3">
						<Button
							variant="outline"
							className="p-0 text-sm text-[#414651] font-semibold h-10 px-3.5"
						>
							Cancel
						</Button>
						<Button
							variant="outline"
							className="p-0 text-sm font-semibold h-10 px-3.5 gradient-border bg-[#11C211] border-[#0a0d120d] text-white"
						>
							Save
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
