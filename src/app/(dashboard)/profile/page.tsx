import UpdateProfileForm from "@/components/forms/update-profile-form";

export default function Page() {
	return (
		<section>
			<h1 className="text-[#181D27] font-semibold text-2xl">Profile</h1>
			<div className="mt-5">
				<UpdateProfileForm />
			</div>
		</section>
	);
}
