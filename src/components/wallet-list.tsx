"use client";

import { WALLET_CURRENCY_ICONS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { useWallets } from "@/store/wallet";
import Image from "next/image";
import Link from "next/link";

export default function WalletList() {
	const allWallets = useWallets();

	return (
		<div className="mt-5 lg:mt-6.5 grid sm:grid-cols-2 xl:grid-cols-3 gap-[27px] lg:gap-8 xl:gap-10 pb-14.5">
			{allWallets.map((wallet) => {
				const iconSrc = WALLET_CURRENCY_ICONS[wallet.currency];

				return (
					<Link
						key={wallet.currency}
						href={`/assets/${wallet.currency}`}
						className="shrink-0 w-full px-4 py-2.5 rounded-[20px] sm:max-w-[280px] min-h-[145px] lg:h-[215px] bg-[#F2F2F0] flex flex-col"
					>
						<div className="flex items-center mb-[17px]">
							<Image
								className="shrink-0"
								src={iconSrc}
								alt={`${wallet.currency} logo`}
								width={63}
								height={63}
							/>
							<span className="inline-block font-medium text-2xl ml-[17px] uppercase">
								{wallet.currency}
							</span>
						</div>
						<span className="mt-auto font-bold text-2xl py-2.5">
							{formatNumber(wallet.balance)}
						</span>
					</Link>
				);
			})}
		</div>
	);
}
