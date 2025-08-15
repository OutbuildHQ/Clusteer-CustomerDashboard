"use client";

import { WALLET_CURRENCY_ICONS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { WalletCurrency, useSelectWallet } from "@/store/wallet";
import { ArrowUp, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AssetClient({ asset }: { asset: string }) {
	const router = useRouter();
	const wallet = useSelectWallet(asset as WalletCurrency);

	if (!wallet) {
		router.push("/");
		return null;
	}

	const iconSrc = WALLET_CURRENCY_ICONS[asset as WalletCurrency];

	return (
		<section className="mt-5 lg:mt-10">
			<header className="flex flex-col md:flex-row pb-5 lg:pb-14 border-b border-[#C4C4C4]">
				<div className="flex flex-col lg:flex-col-reverse gap-y-4">
					<span className="text-5xl font-bold capitalize">
						{`${formatNumber(wallet?.balance)}  ${wallet?.currency}`}
					</span>
					<div className="flex items-center">
						<Image
							className="shrink-0 size-[63px]"
							src={iconSrc}
							alt="asset logo"
							width={63}
							height={63}
						/>
						<span className="font-medium text-2xl ml-[17px] uppercase">
							{`${wallet.currency} Balance`}
						</span>
					</div>
				</div>
				<div className="md:ml-auto mt-7.5 md:mt-0 flex gap-x-[53px]">
					<Link
						href={`/assets/${wallet.currency}/receive`}
						className="inline-block"
					>
						<div className="flex items-center justify-center bg-light-green size-16 rounded-full mx-auto mb-4">
							<Plus
								strokeWidth={2}
								size={39}
							/>
						</div>
						<span className="font-medium text-2xl">Receive</span>
					</Link>
					<Link
						href="#"
						className="inline-block"
					>
						<div className="flex items-center justify-center bg-[#F0EBE6] size-16 rounded-full mx-auto mb-4">
							<Image
								src="/assets/icons/arrow-bidirectional.svg"
								alt="bidirectional arrow icon"
								width={40}
								height={40}
							/>
						</div>
						<span className="font-medium text-2xl">Convert</span>
					</Link>
					<Link
						href={`/assets/${wallet.currency}/send`}
						className="inline-block"
					>
						<div className="flex items-center justify-center bg-[#F0EBE6] size-16 rounded-full mx-auto mb-4">
							<ArrowUp
								strokeWidth={2}
								size={40}
							/>
						</div>
						<span className="font-medium text-2xl">Send</span>
					</Link>
				</div>
			</header>
			<h2 className="mt-5 lg:mt-10 text-2xl font-semibold">Orders</h2>
		</section>
	);
}
