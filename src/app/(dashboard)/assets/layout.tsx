import { CURRENCIES } from "@/lib/data";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
	return CURRENCIES.map((c) => ({
		asset: c.currency,
	}));
}

export default async function Layout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ asset: string }>;
}>) {
	const { asset } = await params;
	const data = CURRENCIES.find((c) => c.currency === asset);
	if (!data) notFound();

	return children;
}
