import BreadcrumbNav from "@/components/breadcrumb-nav";
import DashboardNav from "@/components/dashboard-nav";
import InitializeApp from "@/components/initialize-app";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<InitializeApp>
			<div className="relative px-4 h-full min-h-screen bg-[#FAFAFA] lg:grid lg:grid-cols-[250px_auto] xl:grid-cols-[292px_auto] gap-x-11 xl:gap-14.5 lg:pr-4">
				<div className="pt-2">
					<DashboardNav />
				</div>
				<div className="lg:max-w-[953px] xl:max-w-[1024px]">
					<div className="mt-1.5 lg:mt-10">
						<BreadcrumbNav />
					</div>
					{children}
				</div>
			</div>
		</InitializeApp>
	);
}
