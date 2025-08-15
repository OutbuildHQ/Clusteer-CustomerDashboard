"use client";

import { getUserInfo } from "@/lib/api/user/queries";
import { useUserActions } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import NotificationPermission from "./notification-permission";
import { getUserWallet } from "@/lib/api/wallet/queries";
import { useWalletActions } from "@/store/wallet";

interface Props {
	children: ReactNode;
}

//TODO: Ensure when cookie expires i am logged out
//TODO: Find a way to remove the useState

export default function InitializeApp({ children }: Props) {
	const { data, isPending } = useQuery({
		queryKey: ["user"],
		queryFn: getUserInfo,
	});

	const { data: walletData, isPending: isWalletPending } = useQuery({
		queryKey: ["wallet"],
		queryFn: getUserWallet,
	});

	const { setUser } = useUserActions();
	const { setWallets } = useWalletActions();

	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		if (data && walletData) {
			setUser(data);
			setWallets(walletData.walletAssets);
			setHydrated(true);
		}
	}, [data, walletData, setUser, setWallets]);

	if (isPending || isWalletPending || !hydrated)
		return (
			<div className="flex justify-center items-center min-h-screen w-full">
				<div className="mb-10">
					<Image
						src="/assets/icons/logo_with_name.svg"
						alt="Clusteer logo"
						className="shrink-0 md:w-[160px] animate-pulse duration-[2s]"
						width={123}
						height={42}
					/>
				</div>
			</div>
		);

	return (
		<>
			{children}
			<NotificationPermission />
		</>
	);
}
