import Image from "next/image";
import Link from "next/link";
import Container from "./container";

const NAVLINKS = [
	{ title: "home", icon: "/assets/icons/home.svg", to: "/" },
	{ title: "security", icon: "/assets/icons/chart.svg", to: "/security" },
	{
		title: "identity verification",
		icon: "/assets/icons/identity_verification.svg",
		to: "/identity-verification",
	},
	{ title: "transaction history", icon: "/assets/icons/folder.svg", to: "#" },
];

export default function DashboardNav() {
	return (
		<nav>
			<Container className="flex items-center py-[18px] px-4 w-full bg-white lg:hidden">
				<Image
					src="/assets/icons/logo_with_name.svg"
					alt="Clusteer logo"
					className="shrink-0 md:w-[160px] h-[38px]"
					width={103}
					height={24}
				/>
				<Image
					src="/assets/icons/menu.svg"
					alt="Menu icon"
					className="ml-auto md:hidden"
					width={24}
					height={24}
				/>
			</Container>
			<div className="pt-5 h-full rounded-lg hidden lg:block bg-white border border-[#E9EAEB] shadow-[0px_1px_2px_0px_#0A0D120D]">
				<div className="px-5">
					<Image
						src="/assets/icons/logo_with_name.svg"
						alt="Clusteer logo"
						width={139}
						height={32}
					/>
				</div>
				<div className="px-4">
					<ul className="mt-20 flex flex-col gap-y-1">
						{NAVLINKS.map((navItem) => (
							<Link
								key={navItem.title}
								href={navItem.to}
								className="flex gap-x-2 items-center font-semibold text-base text-[#414651] capitalize py-2 px-3 hover:bg-[#FAFAFA]"
							>
								<Image
									src={navItem.icon}
									alt="home icon"
									width={22}
									height={22}
								/>
								{navItem.title}
							</Link>
						))}
					</ul>
					<div className="my-2.5 border border-[#E9EAEB]" />
					<ul className="flex flex-col gap-y-1">
						<Link
							href="/profile"
							className="flex gap-x-2 items-center font-semibold text-base text-[#414651] py-2 px-3 hover:bg-[#FAFAFA]"
						>
							<Image
								src="/assets/icons/settings.svg"
								alt="home icon"
								width={22}
								height={22}
							/>
							Settings
						</Link>
						<Link
							href="#"
							className="flex gap-x-2 items-center font-semibold text-base text-[#414651] py-2 px-3 hover:bg-[#FAFAFA]"
						>
							<Image
								src="/assets/icons/support.svg"
								alt="home icon"
								width={22}
								height={22}
							/>
							Support
							<div className="ml-auto border border-[#E9EAEB] py-0.5 px-1.5 rounded-lg flex items-center gap-x-1">
								<div className="bg-dark-green size-2 rounded-full"></div>
								<span className="text-sm text-[#414651]">Online</span>
							</div>
						</Link>
					</ul>
				</div>
			</div>
		</nav>
	);
}
