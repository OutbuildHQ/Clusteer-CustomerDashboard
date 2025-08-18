import Banner from "@/components/banner";
import BuySellCrypto from "@/components/buy-sell-crypto";
import { OrdersTable } from "@/components/tables/orders-table";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/user-profile";
import WalletList from "@/components/wallet-list";

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
					<UserProfile />
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
				<OrdersTable />
			</section>
		</div>
	);
}
