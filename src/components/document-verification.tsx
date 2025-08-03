"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type VerficationType = "NIN" | "BVN" | null;

export default function DocumentVerfication() {
	const [selectedOption, setSelectedOption] = useState<VerficationType>("BVN");
	const [verification, setVerification] = useState<VerficationType>(null);

	const handleContinue = () => {
		setVerification(selectedOption);
	};

	return (
		<section className="mt-[52px] pb-[82px]">
			{verification === null && (
				<>
					<div className="w-full lg:max-w-[478px]">
						<h1 className="font-semibold text-3xl">Document Verification</h1>
						<p className="text-[#1A1A1C] mt-2.5">
							Your ID will be scanned for personal data extraction
						</p>

						<div className="mt-6">
							<RadioGroup
								className="gap-y-2.5"
								onValueChange={(value) =>
									setSelectedOption(value.toUpperCase() as VerficationType)
								}
								value={selectedOption}
							>
								<div className="bg-[#F3F3F3] border border-light-green rounded-sm p-5">
									<div className="flex items-center justify-between font-inter">
										<div>
											<Label
												className="text-[#344054]"
												htmlFor="bvn"
											>
												Bank Verification Number (BVN)
											</Label>
											<Badge
												variant="secondary"
												className="h-5 bg-pale-green px-3 text-dark-green rounded-none font-medium text-sm mt-1"
											>
												Recommended
											</Badge>
										</div>
										<RadioGroupItem
											className="ml-auto"
											indicatorClassName="fill-dark-green stroke-dark-green"
											value="BVN"
											id="bvn"
										/>
									</div>
								</div>

								<div className="bg-[#F3F3F3] border border-light-green rounded-sm p-5">
									<div className="flex items-center justify-between font-inter">
										<Label
											className="text-[#344054]"
											htmlFor="nin"
										>
											National Identity Number (NIN)
										</Label>
										<RadioGroupItem
											className="ml-auto"
											indicatorClassName="fill-dark-green stroke-dark-green"
											value="NIN"
											id="nin"
										/>
									</div>
								</div>
							</RadioGroup>

							<Button
								type="submit"
								onClick={handleContinue}
								className="border-black bg-light-green border text-black font-semibold text-base hover:bg-muted w-full h-11 mt-14.5"
							>
								Continue
							</Button>
						</div>
					</div>

					<Button
						type="button"
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
			)}

			{verification !== null && (
				<div>
					{/* Here, you can show a different form based on the selected option */}
					<h2 className="text-xl font-bold mb-4">
						Selected:{" "}
						{verification === "BVN"
							? "Bank Verification Number"
							: "National Identity Number"}
					</h2>
					{/* Add your form for BVN or NIN here */}
				</div>
			)}
		</section>
	);
}
