"use client";

import { ReactNode, useCallback, useState } from "react";
import BuyCryptoForm from "./forms/buy-crypto-form";
import SellCryptoForm from "./forms/sell-crypto-form";
import FeeDetailsModal from "./modals/fee-details-modal";
import RealTimeRates from "./real-time-rates";
import { Button } from "./ui/button";
import TransactionSummaryModal from "./modals/transaction-summary-modal";
import PaymentModal from "./modals/payment-modal";
import SuccessModal from "./modals/success-modal";

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
					onClick={() => handleSelectForm("buy")}
					className="h-9 font-semibold max-w-[86px] w-full text-sm rounded-[100px] text-black bg-[#F0EBE6] hover:bg-light-green hover:text-dark-green shadow-[0px_1px_2px_0px_#1018280D]"
				>
					Buy
				</Button>
				<Button
					onClick={() => handleSelectForm("sell")}
					className="h-9 font-semibold max-w-[86px] w-full text-sm rounded-[100px] text-black bg-[#F0EBE6] hover:bg-light-green hover:text-dark-green shadow-[0px_1px_2px_0px_#1018280D]"
				>
					Sell
				</Button>
			</div>
			<div className="mt-6.5 py-10 lg:py-7.5 px-11 sm:px-12.5 bg-[#F2F2F0] grid lg:grid-cols-2 gap-y-8.5 lg:gap-x-12 xl:gap-x-[61px] items-center rounded-[28px]">
				<RealTimeRates />
				{renderCurrentForm(currentForm)}
			</div>
			<FeeDetailsModal />
			<TransactionSummaryModal />
			<PaymentModal />
			<SuccessModal />
		</div>
	);
}
