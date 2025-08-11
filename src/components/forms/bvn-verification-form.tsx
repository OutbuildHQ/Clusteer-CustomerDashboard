"use client";

import { BVNVerificationFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pentagon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export type BVNVerificationFormData = z.infer<typeof BVNVerificationFormSchema>;

export default function BVNVerficationForm() {
	const form = useForm<BVNVerificationFormData>({
		mode: "onChange",
		resolver: zodResolver(BVNVerificationFormSchema),
		defaultValues: {
			bvn: "",
		},
	});

	const [isChecked, setIsChecked] = useState(false);

	const handleCheckedChange = (checked: boolean) => {
		setIsChecked(!!checked);
	};

	const onSubmit = (data: BVNVerificationFormData) => {
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
					name="bvn"
					render={({ field }) => (
						<FormItem className="gap-1.5">
							<FormLabel className="font-medium">
								Enter your Bank Verification Number (BVN)
							</FormLabel>
							<FormControl>
								<Input
									className="h-11"
									placeholder="Enter your BVN"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="mt-12 space-y-4">
					<p>
						Clusteer wants to access your BVN information. By clicking Continue,
						you agree to allow Clusteer to:
					</p>
					<ul className="text-sm space-y-0.5">
						<li className="flex items-center gap-x-2.5 py-1 px-2.5">
							<Pentagon
								fill="#000"
								className="inline-block size-2"
							/>
							Process your personal details
						</li>
						<li className="flex items-center gap-x-2.5 py-1 px-2.5">
							<Pentagon
								fill="#000"
								className="inline-block size-2"
							/>
							Process your contact information
						</li>
						<li className="flex items-center gap-x-2.5 py-1 px-2.5">
							<Pentagon
								fill="#000"
								className="inline-block size-2"
							/>
							Process your document information
						</li>
					</ul>
					<div className="flex gap-x-2.5 p-2.5 rounded-md bg-[#F3F3F3]">
						<Checkbox
							id="privacy-policy"
							checked={isChecked}
							onCheckedChange={handleCheckedChange}
							className="data-[state=checked]:border-light-green data-[state=checked]:bg-light-green data-[state=checked]:text-white"
						/>
						<Label
							htmlFor="privacy-policy"
							className="font-normal gap-x-1"
						>
							I have read and accept Clusteer’s
							<Link
								href="#"
								className="text-dark-green underline"
							>
								privacy policy
							</Link>
						</Label>
					</div>
				</div>

				<Button
					type="submit"
					className="mt-10 font-mona border-black text-[#111111] bg-light-green border font-semibold text-base shadow-xs hover:bg-muted w-full h-11"
				>
					{/* {isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Resetting...
						</>
					) : (
						<>Reset Passwor</>
					)} */}
					Continue
				</Button>
			</form>
		</Form>
	);
}
