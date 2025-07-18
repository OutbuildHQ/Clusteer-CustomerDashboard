"use client";

import { MAXIMUM_VALUE, MINIMUM_VALUE } from "@/lib/constants";
import { BuyCryptoSchema } from "@/lib/validation";
import { MODAL_IDS, useModalActions } from "@/store/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CryptoInput from "../crypto-input";
import FiatInput from "../fiat-input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

type BuyCryptoFormType = z.infer<typeof BuyCryptoSchema>;

export default function BuyCryptoForm() {
	const form = useForm<BuyCryptoFormType>({
		mode: "onChange",
		resolver: zodResolver(BuyCryptoSchema),
		defaultValues: {
			pay: MINIMUM_VALUE,
		},
	});

	const { openModal } = useModalActions();

	return (
		<Form {...form}>
			<form className="font-avenir-next flex flex-col gap-y-3 lg:gap-y-1.5">
				<FormField
					control={form.control}
					name="pay"
					render={({ field }) => (
						<FormItem className="gap-1.5">
							<FormLabel className="font-medium">Pay</FormLabel>
							<FormControl>
								<FiatInput {...field} />
							</FormControl>
							<FormDescription className="space-y-1.5">
								<span className="block text-[#535862]">
									Limit: {MINIMUM_VALUE.toLocaleString()} -{" "}
									{MAXIMUM_VALUE.toLocaleString()} NGN
								</span>
								<span className="block text-[#535862]">
									Transaction fees: 0 USDT
								</span>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<button
					type="button"
					className="bg-white rounded-full size-11 flex items-center justify-center mx-auto"
				>
					<Image
						src="/assets/icons/double_arrow.svg"
						alt="swap icon"
						width={24}
						height={24}
					/>
				</button>

				<FormItem className="gap-1.5">
					<FormLabel className="font-medium">Receive</FormLabel>
					<FormControl>
						<CryptoInput name={"pay"} />
					</FormControl>
					<FormDescription className="text-[#535862]">
						Available: <span className="font-bold">3.33</span> USDT
					</FormDescription>
					<FormMessage />
				</FormItem>

				<div className="mt-6.5 grid lg:grid-cols-[2fr_1fr] items-center divide-[#00000066] lg:divide-x-[0.5px] px-7.5 py-2.5 lg:py-4 border border-[#21241D4D] rounded-xl text-sm">
					<div>
						<span className="text-[#535862]">Pay with:</span>
						<div className="flex items-start sm:items-center gap-x-1">
							<Image
								src="/assets/icons/credit_card.svg"
								alt="credit card icon"
								width={24}
								height={24}
							/>
							<span className="font-semibold">Bank Transfer(3352)</span>
						</div>
					</div>
					<div className="border-b-[0.5px] border-[#00000066] my-6 lg:hidden" />
					<div className="w-fit lg:pl-4 lg:ml-auto">
						<p className="text-[#535862]">Pay within:</p>
						<p className="font-semibold">15 mins</p>
					</div>
				</div>

				<button
					type="button"
					onClick={() => openModal(MODAL_IDS.FEE_DETAILS)}
					className="flex items-center gap-x-3 text-black bg-light-green w-full justify-center h-11 rounded-4xl border border-black mx-auto mt-7.5"
				>
					<span className="text-base font-semibold text-black">Buy</span>
				</button>
			</form>
		</Form>
	);
}
