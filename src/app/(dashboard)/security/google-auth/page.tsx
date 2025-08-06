"use client";

import GoogleAuthForm from "@/components/forms/google-otp-form";
import GoogleAuthQRCode from "@/components/google-auth-qrcode";
import SecurityAlert from "@/components/security-alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type FormStage =
	| "bind-new-authenticator"
	| "security-verfification"
	| "success";

const formStages: FormStage[] = [
	"bind-new-authenticator",
	"security-verfification",
	"success",
];

export default function Page() {
	const [stage, setStage] = useState<FormStage>(formStages[0]);
	const router = useRouter();

	const idx = useMemo(() => formStages.indexOf(stage), [stage]);

	const goNext = useCallback(() => {
		if (idx < formStages.length - 1) {
			setStage(formStages[idx + 1]);
		} else {
			router.push("/");
		}
	}, [idx, router]);

	const goBack = useCallback(() => {
		if (idx === 0) {
			router.push("/security");
		} else {
			setStage(formStages[idx - 1]);
		}
	}, [idx, router]);

	const forms = useMemo(
		() => ({
			"bind-new-authenticator": (
				<div className="lg:max-w-[533px] mt-5">
					<SecurityAlert content="For your assets security, it won’t be able to Withdraw or Sell in P2P within 24 hours of after setting up or changing the Google Authentication" />
					<div className="mt-5">
						<span className="font-medium text-lg">
							Add key in Google Authenticator and backup
						</span>
						<p className="text-sm mt-2.5">
							Open Google Authenticator, scan the QR code below or manually
							enter the following key to add a verification token. The key is
							used to retrieve your Google Authenticator if you change or lose
							your phone. Make sure to back up the key before binding.
						</p>
					</div>
					<GoogleAuthQRCode />
					<Button
						onClick={goNext}
						className="mt-7.5 h-11 font-semibold border-black text-[#111111] bg-light-green border text-base shadow-xs hover:bg-muted w-full"
					>
						Next
					</Button>
				</div>
			),
			"security-verfification": (
				<div className="md:max-w-[533px] mt-5 lg:mt-[87px]">
					<GoogleAuthForm onVerificationComplete={goNext} />
				</div>
			),
			success: (
				<div className="mt-5 lg:mt-[73px] w-fit">
					<p className="font-bold text-2xl">
						Your account is secured with Google Authenticator
					</p>

					<Button
						onClick={goNext}
						className="mt-7.5 h-11 font-semibold border-black text-[#111111] bg-light-green border text-base shadow-xs hover:bg-muted w-full"
					>
						Make a transaction
					</Button>
				</div>
			),
		}),
		[goNext]
	);

	return (
		<section className="mt-5 lg:mt-10 pb-[113px] xl:pb-[140px]">
			<header>
				<div className="flex gap-x-5 items-center py-5 border-b lg:py-0 lg:border-b-0 border-[#21241D33]">
					<Button
						variant="ghost"
						className="!p-0 size-6"
						onClick={goBack}
					>
						<ArrowLeft className="shrink-0 size-full" />
					</Button>
					<h1 className="text-[#181D27] font-semibold text-xl sm:text2xl">
						Configure Google Authenticator
					</h1>
				</div>

				<RadioGroup
					className="hidden lg:flex justify-between items-center mt-1"
					value={stage}
				>
					{formStages.map((s) => (
						<div
							key={s}
							className="flex items-center gap-x-2.5"
						>
							<RadioGroupItem
								className="peer size-8 data-[state=checked]:bg-dark-green data-[state=unchecked]:bg-[#E4E4E4] data-[state=unchecked]:border-none data-[state=checked]:ring-4 data-[state=checked]:ring-[#FBE6F8]"
								indicatorClassName="fill-white stroke-white scale-45"
								value={s}
								id={s}
							/>
							<Label
								htmlFor={s}
								className="text-base font-normal text-[#B1B1B1] peer-data-[state=checked]:text-dark-green"
							>
								{s === "bind-new-authenticator"
									? "Bind new authenticator"
									: s === "security-verfification"
									? "Security verification"
									: "Successful"}
							</Label>
						</div>
					))}
				</RadioGroup>
			</header>

			{forms[stage]}
		</section>
	);
}
