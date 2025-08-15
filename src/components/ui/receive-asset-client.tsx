"use client";

import { WalletCurrency, useSelectWallet } from "@/store/wallet";
import { useRouter } from "next/navigation";
import PaymentForm from "../forms/payment-form";

export default function ReceiveAssetClient({ asset }: { asset: string }) {
	const router = useRouter();
	const wallet = useSelectWallet(asset as WalletCurrency);

	if (!wallet) {
		router.push("/");
		return null;
	}
	return (
		<section className="mt-8.5 lg:mt-10">
			<header>
				<h1 className="font-bold text-3xl capitalize">Receive {wallet.name}</h1>
			</header>
			<div className="mt-5 lg:max-w-xl">
				<PaymentForm />
			</div>
			<div className="mt-8.5 xl:mt-[73px] pt-11 xl:pt-0 border-t lg:border-t-0 border-[#00000066]">
				<h2 className="text-2xl font-semibold">Receive History</h2>
			</div>
		</section>
	);
}
