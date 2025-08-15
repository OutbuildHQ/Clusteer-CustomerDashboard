"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

function copyToClipboard(text: string) {
	navigator.clipboard.writeText(text);
	toast.success("Copied to clipboard");
}

export function CopyButton({
	className,
	value,
}: {
	className?: string;
	value: string;
}) {
	return (
		<Button
			variant="outline"
			size="icon"
			className={cn("transition-colors w-fit px-2", className)}
			onClick={() => copyToClipboard(value)}
		>
			<Copy className="size-4.5" />
			<span className="text-base font-medium">Copy</span>
		</Button>
	);
}
