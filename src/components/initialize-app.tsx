"use client";

import { getUserInfo } from "@/lib/api/user/queries";
import { useUserActions } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

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

	const { setUser } = useUserActions();
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		if (data) {
			setUser(data);
			setHydrated(true);
		}
	}, [data, setUser]);

	if (isPending || !hydrated)
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

	return <>{children}</>;

	// return (
	// 	<AnimatePresence mode="popLayout">
	// 		{isPending ? (
	// 			<motion.section
	// 				initial={{ opacity: 0 }}
	// 				animate={{ opacity: 1 }}
	// 				exit={{ opacity: 0 }}
	// 				transition={{ duration: 1, ease: "easeOut" }}
	// 				className="w-screen h-screen flex items-center justify-center bg-white"
	// 			>
	// 				<div className="flex items-center gap-2 font-medium animate-pulse">
	// 					<div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
	// 						<GalleryVerticalEnd className="size-6" />
	// 					</div>
	// 					<span className="text-lg">X-Aggregator</span>
	// 				</div>
	// 			</motion.section>
	// 		) : (
	// 			<motion.section
	// 				initial={{ opacity: 0 }}
	// 				animate={{ opacity: 1 }}
	// 				exit={{ opacity: 0 }}
	// 				transition={{ duration: 1, ease: "easeOut" }}
	// 			>
	// 				{children}
	// 			</motion.section>
	// 		)}
	// 	</AnimatePresence>
	// );
}
