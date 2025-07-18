import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function RealTimeRates() {
	const [isLoading, setIsLoading] = useState(false);

	function mockFetch() {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}

	return (
		<div className="flex gap-x-4 lg:gap-x-12 justify-between items-center font-avenir-next">
			<div>
				<p className="text-sm sm:text-base font-medium text-[#414651] mb-2.5">
					Rates (Real-time update)
				</p>
				<span className="text-2xl font-bold">1 USDT = 1,575 NGN</span>
			</div>
			<button onClick={mockFetch}>
				<RefreshCw
					className={cn({
						"animate-spin": isLoading,
					})}
					strokeWidth={2}
					width={24}
					height={24}
				/>
			</button>
		</div>
	);
}
