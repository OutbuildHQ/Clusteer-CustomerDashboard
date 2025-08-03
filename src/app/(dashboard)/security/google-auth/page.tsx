import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";

export default function Page() {
	return (
		<section className="mt-5 lg:mt-10 pb-[113px] xl:pb-[140px]">
			<header>
				<div className="flex gap-x-5 items-center">
					<ArrowLeft size={24} />
					<h1 className="text-[#181D27] font-semibold text-2xl lg:text-2xl">
						Configure Google Authenticator
					</h1>
				</div>
				<RadioGroup
					className="flex justify-between items-center"
					// onValueChange={(value) =>
					// 	setSelectedOption(value.toUpperCase() as VerficationType)
					// }
					// value={selectedOption}
				>
					<div className="flex items-center gap-x-2.5">
						<RadioGroupItem
							className="size-8 data-[state=checked]:bg-dark-green data-[state=unchecked]:bg-[#B1B1B1] data-[state=unchecked]:border-[#B1B1B1] focus-visible:border-[#FBE6F8]"
							indicatorClassName="fill-white stroke-white"
							value="bind-new-authenticator"
							id="bind-new-authenticator"
						/>
						<Label
							className="text-dark-green text-base font-normal"
							htmlFor="bind-new-authenticator"
						>
							Bind new authenticator
						</Label>
					</div>
					<div className="flex items-center gap-x-2.5">
						<RadioGroupItem
							className="peer size-8 data-[state=checked]:bg-dark-green data-[state=unchecked]:bg-[#B1B1B1] data-[state=unchecked]:border-[#B1B1B1] focus-visible:border-[#FBE6F8]"
							indicatorClassName="fill-white stroke-white"
							value="security-verfification"
							id="security-verfification"
						/>
						<Label
							htmlFor="security-verfification"
							className="text-base font-normal 
               peer-data-[state=checked]:text-dark-green 
               peer-data-[state=unchecked]:text-[#B1B1B1]"
						>
							Security verification
						</Label>
					</div>

					<div className="flex items-center gap-x-2.5">
						<RadioGroupItem
							className="size-8 data-[state=checked]:bg-dark-green data-[state=unchecked]:bg-[#B1B1B1] data-[state=unchecked]:border-[#B1B1B1] focus-visible:border-[#FBE6F8]"
							indicatorClassName="fill-white stroke-white"
							value="success"
							id="success"
						/>
						<Label
							className="text-dark-green text-base font-normal"
							htmlFor="success"
						>
							Successful
						</Label>
					</div>
				</RadioGroup>
			</header>
		</section>
	);
}
