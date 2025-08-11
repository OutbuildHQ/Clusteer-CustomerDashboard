"use client";

import { NINVerificationFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CircularProgress from "../circular-progress";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";

export type NINVerificationFormData = z.infer<typeof NINVerificationFormSchema>;

export default function NINVerificationForm() {
	const uploadContainerRef = useRef<HTMLDivElement | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const form = useForm<NINVerificationFormData>({
		mode: "onChange",
		resolver: zodResolver(NINVerificationFormSchema),
		defaultValues: {
			image: undefined,
		},
	});

	const handleFileChange = (
		file: File | undefined,
		onChange: (value: File | undefined) => void
	) => {
		if (!file) {
			setSelectedFile(null);
			onChange(undefined);
			return;
		}
		setSelectedFile(file);
		onChange(file);
	};

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const onUploadContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		fileInputRef.current?.click();
	};

	const onSubmit = (data: NINVerificationFormData) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form
				className="mt-10.5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="image"
					render={({ field: { onChange } }) => (
						<FormItem>
							<FormControl>
								<div
									ref={uploadContainerRef}
									onClick={onUploadContainerClick}
									className="relative flex flex-col items-center border-2 border-[#EAECF0] w-full rounded-xl py-4 px-6 text-sm text-center cursor-pointer"
								>
									<Image
										className="size-10"
										src="/assets/icons/upload.svg"
										alt="upload icon"
										width={40}
										height={40}
									/>
									<div className="flex items-center mt-3">
										<div className="mr-4">
											<p className="text-[#535862]">
												<span className="text-[#008000] font-semibold">
													Click to upload
												</span>{" "}
												or drag and drop
											</p>
											<p className="mt-1 text-[#535862]">
												SVG, PNG, JPG or GIF (max. 800x400px)
											</p>
										</div>
									</div>

									<input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										style={{ display: "none" }}
										onChange={(e) =>
											handleFileChange(e.target.files?.[0], onChange)
										}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{selectedFile && (
					<div className="min-h-[72px] grid grid-cols-[70%_auto] mt-4 border-2 border-[#EAECF0] rounded-xl overflow-hidden">
						<div className="flex items-center p-4 gap-x-4 bg-[#F3F3F3] h-full font-inter text-sm">
							<Image
								src="/assets/icons/upload_file.svg"
								alt="file icon"
								width={28}
								height={28}
							/>
							<div>
								<span className=" font-medium text-[#344054]">
									{`${selectedFile?.name}`}
								</span>
								<p className=" text-[#475467]">
									{`${Math.round(selectedFile.size / 1024)} KB`} – 70% uploaded
								</p>
							</div>
						</div>
						<div className="flex items-center justify-end px-4">
							<CircularProgress
								value={54}
								size={54}
								strokeWidth={5}
								className="ml-auto stroke-[#F2F4F7]"
								progressClassName="stroke-light-green"
							/>
						</div>
					</div>
				)}

				<Button
					type="submit"
					disabled={!form.formState.isValid}
					className="mt-10 font-mona border-black text-[#111111] bg-light-green border font-medium text-base shadow-xs hover:bg-muted w-full h-11"
				>
					Continue
				</Button>
			</form>
		</Form>
	);
}
