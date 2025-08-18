import Container from "@/components/container";
import LoginForm from "@/components/forms/login-form";
import Image from "next/image";

export default function LoginPage() {
	return (
		<Container className="mt-[30px] mb-[75px] md:max-h-screen md:mt-36 text-start flex flex-col md:flex-row justify-center items-center md:items-start gap-x-5 lg:gap-x-24">
			<div className="max-w-[300px] w-full">
				<header className="pt-14 md:pt-0 text-center md:text-start">
					<Image
						src="/assets/icons/logo_with_name.svg"
						alt="Clusteer logo"
						className="shrink-0 hidden md:block"
						width={125}
						height={30}
					/>
					<h1 className="font-semibold text-3xl md:mt-[26px]">Welcome Back</h1>
					<p className="mt-3 text-base text-black">
						Sign into your account to access your dashboard
					</p>
				</header>
			</div>
			<div className="max-w-[400px] w-full mt-[52px] md:mt-0">
				<LoginForm />
				<div className="p-2.5 mt-2.5 text-center">
					<p className="text-[11px]">
						By logging in you agree to our <br />{" "}
						<span className="text-dark-green">Terms of Service</span> and{" "}
						<span className="text-dark-green">Privacy Policies</span>
					</p>
				</div>
			</div>
		</Container>
	);
}
