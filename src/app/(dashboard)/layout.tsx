import DashboardNav from "@/components/dashboard-nav";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="pt-2 px-4 h-full min-h-screen bg-[#FAFAFA] lg:grid lg:grid-cols-[250px_auto] xl:grid-cols-[292px_auto] gap-x-11 xl:gap-[58px] lg:pr-3">
			<DashboardNav />
			<div className="lg:max-w-[953px] xl:max-w-[1024px]">{children}</div>
		</div>
	);
}
