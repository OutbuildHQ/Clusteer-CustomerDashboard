"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useCallback, useState } from "react";
import BuyCryptoForm from "./forms/buy-crypto-form";
import SellCryptoForm from "./forms/sell-crypto-form";
import RealTimeRates from "./real-time-rates";
import { Button } from "./ui/button";
import Image from "next/image";

type FormType = "buy" | "sell";

function renderCurrentForm(currentForm: FormType): ReactNode {
	switch (currentForm) {
		case "buy":
			return <BuyCryptoForm />;
		case "sell":
			return <SellCryptoForm />;
	}
}

export default function BuySellCrypto() {
	const [currentForm, setCurrentForm] = useState<FormType>("buy");

	const handleSelectForm = useCallback((form: FormType) => {
		setCurrentForm(form);
	}, []);

	return (
		<div>
			<div className="flex gap-x-2">
				<Button
					variant="outline"
					onClick={() => handleSelectForm("buy")}
					className={cn(
						"h-9 font-semibold max-w-[86px] w-full text-sm rounded-[100px] hover:bg-light-green border-light-green",
						{
							"bg-light-green": currentForm === "buy",
						}
					)}
				>
					Buy
				</Button>
				<Button
					variant="outline"
					onClick={() => handleSelectForm("sell")}
					className={cn(
						"h-9 font-semibold max-w-[86px] w-full text-sm rounded-[100px] hover:bg-light-green border-light-green",
						{
							"bg-light-green": currentForm === "sell",
						}
					)}
				>
					Sell
				</Button>
			</div>
			<div className="mt-6.5 py-10 lg:py-7.5 px-11 sm:px-12.5 bg-[#F2F2F0] grid lg:grid-cols-2 gap-y-8.5 lg:gap-x-12 xl:gap-x-[61px] items-center rounded-[28px]">
				<div className="h-full flex flex-col -center gap-y-16">
					<RealTimeRates />
					<div className="relative h-full w-full">
						<Image
							src="/assets/images/complex_chart.svg"
							alt="comples chart diagram"
							fill
							// width={24}
							// height={24}
						/>
					</div>
				</div>
				{renderCurrentForm(currentForm)}
			</div>
		</div>
	);
}
