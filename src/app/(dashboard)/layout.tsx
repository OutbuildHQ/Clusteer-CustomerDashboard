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
			<div className="relative h-full min-h-[100dvh] bg-[#FAFAFA] lg:grid lg:grid-cols-[250px_auto] xl:grid-cols-[292px_auto] gap-x-11 xl:gap-14.5 lg:pr-4">
				<div className="lg:pt-2 lg:pl-4 h-full">
					<DashboardNav />
				</div>
				<div className="lg:max-w-[953px] xl:max-w-[1024px] px-4">
					<div className="mt-1.5 lg:mt-10">
						<BreadcrumbNav />
					</div>
					{children}
				</div>
			</div>
		</InitializeApp>
	);
}
