import Banner from "@/components/banner";
import BuySellCrypto from "@/components/buy-sell-crypto";
import { TransactionsTable } from "@/components/transactions-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WalletList from "@/components/wallet-list";
import Image from "next/image";

export default function Page() {
	return (
		<div className="font-avenir-next pb-6 lg:pt-[50px]">
			<Banner
				title="Complete your Verification to proceed"
				description="Your security and trust are paramount to us, which is why we’ve
					implemented Identity Verification protocol. Verifying your identity
					ensures that Niply remains a safe and reliable platform for all users,
					and also enables you to enjoy an enhanced range of features and
					services."
				link="/identity-verification"
			/>
			<section className="mt-5 lg:mt-20">
				<header>
					<div className="items-center gap-x-1.5 py-2.5 mb-1.5 hidden lg:flex">
						<div className="flex items-center gap-x-1.5">
							<div className="relative">
								<Avatar className="size-10">
									<AvatarFallback>J</AvatarFallback>
								</Avatar>
								<div className="size-2.5 bg-[#12B76A] absolute right-0 bottom-0 z-10 rounded-full border-2 border-white"></div>
							</div>
							<span className="inline-block ml-2.5 font-semibold text-2xl">
								Jason
							</span>
						</div>
						<Badge
							variant="secondary"
							className="bg-pale-green text-dark-green h-6 rounded-[100px]"
						>
							<Image
								src="/assets/icons/check_small.svg"
								alt="small check icon"
								width={10}
								height={10}
							/>
							Verified
						</Badge>
					</div>
					<div className="flex gap-x-2">
						<Button className="h-9 font-semibold max-w-[86px] w-full text-sm rounded-[100px] text-black bg-[#F0EBE6] hover:bg-light-green hover:text-dark-green shadow-[0px_1px_2px_0px_#1018280D]">
							Receive
						</Button>
						<Button className="h-9 font-semibold max-w-[86px] w-full text-sm rounded-[100px] text-black bg-[#F0EBE6] hover:bg-light-green hover:text-dark-green shadow-[0px_1px_2px_0px_#1018280D]">
							Send
						</Button>
					</div>
				</header>
				<WalletList />
			</section>
			<section className="mt-14.5">
				<BuySellCrypto />
			</section>
			<section className="mt-11">
				<TransactionsTable />
			</section>
		</div>
	);
}
