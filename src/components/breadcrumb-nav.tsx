import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

export default function BreadcrumbNav() {
	return (
		<Breadcrumb className="py-2">
			<BreadcrumbList className="!gap-3">
				<BreadcrumbItem>
					<BreadcrumbLink
						className="text-[#475467]"
						href="/"
					>
						Dashboard
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Image
						src="/assets/icons/slash-divider.svg"
						alt="slash icon"
						width={20}
						height={20}
					/>
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink
						className="text-[#475467]"
						href="/components"
					>
						Assets
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Image
						src="/assets/icons/slash-divider.svg"
						alt="slash icon"
						width={20}
						height={20}
					/>
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink
						className="text-[#475467]"
						href="/components"
					>
						Receive
					</BreadcrumbLink>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
