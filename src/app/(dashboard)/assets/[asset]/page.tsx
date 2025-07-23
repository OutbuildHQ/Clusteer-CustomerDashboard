import { CURRENCIES } from "@/lib/data";
import { ArrowUp, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
	params,
}: {
	params: Promise<{ asset: string }>;
}) {
	const { asset: assetName } = await params;
	const asset = CURRENCIES.find((c) => c.currency === assetName)!;

	return (
		<section className="mt-5 lg:mt-10">
			<header className="flex flex-col md:flex-row pb-5 lg:pb-14 border-b border-[#C4C4C4]">
				<div className="flex flex-col lg:flex-col-reverse gap-y-4">
					<span className="text-5xl font-bold capitalize">
						{`${asset?.rate}  ${asset?.currency}`}
					</span>
					<div className="flex items-center">
						<Image
							src={asset?.icon}
							alt="asset logo"
							width={63}
							height={63}
						/>
						<span className="font-medium text-2xl ml-[17px] uppercase">
							{`${asset?.currency} Balance`}
						</span>
					</div>
				</div>
				<div className="md:ml-auto mt-7.5 md:mt-0 flex gap-x-[53px]">
					<Link
						href={`/assets/${assetName}/receive`}
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
						href="#"
						className="inline-block"
					>
						<div className="flex items-center justify-center bg-[#F0EBE6] size-16 rounded-full mx-auto mb-4">
							<ArrowUp
								strokeWidth={2}
								size={40}
							/>
						</div>
						<span className="font-medium text-2xl">Convert</span>
					</Link>
				</div>
			</header>
			<h2 className="mt-5 lg:mt-10 text-2xl font-semibold">Orders</h2>
		</section>
	);
}
