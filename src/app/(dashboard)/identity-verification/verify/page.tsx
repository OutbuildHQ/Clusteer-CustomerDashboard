import DocumentVerfication from "@/components/document-verification";

export default function Page() {
	return (
		<section className="mt-[52px] relative">
			{/* {
				<>
					<div className="w-full lg:max-w-[478px]">
						<h1 className="font-semibold text-3xl">Let’s get you verified</h1>
						<p className="text-[#1A1A1C] mt-2.5">
							Select your residency and follow the steps
						</p>

						<div className="mt-4.5">
							<FormItem className="gap-1.5">
								<label className="font-medium text-black">Residency</label>
								<Select defaultValue="nigeria">
									<SelectTrigger className="w-full border-black shadow-[0px_1px_2px_0px_#1018280D">
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="asia">Asia</SelectItem>
										<SelectItem value="nigeria">Nigeria</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
							<div className="mt-7">
								<p className="text-[#1A1A1C]">
									Complete the following steps to verify your account in{" "}
									<span className="font-bold">5 minutes</span>
								</p>
								<ul className="list-circle mt-7.5 text-[#1A1A1C]">
									<li className="flex items-center gap-x-2.5 p-2.5">
										<CircleSmall
											size={13}
											strokeWidth={3}
										/>
										Government-issued ID
									</li>
									<li className="flex items-center gap-x-2.5 p-2.5">
										<CircleSmall
											size={13}
											strokeWidth={3}
										/>
										Liveness check
									</li>
								</ul>
							</div>
							<Button
								variant="ghost"
								className="border-black bg-light-green font-semibold w-full h-11 text-base mt-[82px] border text-black"
							>
								Continue
							</Button>
						</div>
					</div>
					<Button
						variant="ghost"
						asChild
						className="hidden md:flex"
					>
						<div className="p-2.5 items-center gap-x-2.5 cursor-pointer absolute top-0 right-0">
							<Save size={24} />
							<span className="font-medium text-base">Save and Exit</span>
						</div>
					</Button>
				</>
			} */}

			<DocumentVerfication />
		</section>
	);
}
