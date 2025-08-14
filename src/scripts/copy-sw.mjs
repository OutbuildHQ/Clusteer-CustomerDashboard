import { configDotenv } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";

// Load env variables locally if NODE_ENV is not production
if (process.env.NODE_ENV !== "production") {
	const envFile = resolve(process.cwd(), ".env.local");
	configDotenv({ path: envFile });
	console.log(`✅ Loaded environment variables from ${envFile}`);
}

// Read service worker template
const swTemplatePath = resolve(process.cwd(), "src/sw-template.js");
const swTemplate = readFileSync(swTemplatePath, "utf8");

// Replace placeholders with environment variables (use empty string if undefined)
const withEnv = swTemplate
	.replace(
		/__FIREBASE_API_KEY__/g,
		process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ""
	)
	.replace(
		/__FIREBASE_AUTH_DOMAIN__/g,
		process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || ""
	)
	.replace(
		/__FIREBASE_PROJECT_ID__/g,
		process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ""
	)
	.replace(
		/__FIREBASE_STORAGE_BUCKET__/g,
		process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || ""
	)
	.replace(
		/__FIREBASE_MESSAGING_SENDER_ID__/g,
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ""
	)
	.replace(
		/__FIREBASE_APP_ID__/g,
		process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
	)
	.replace(
		/__FIREBASE_MEASUREMENT_ID__/g,
		process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
	);

// Ensure public folder exists
const publicDir = resolve(process.cwd(), "public");
if (!existsSync(publicDir)) {
	mkdirSync(publicDir);
}

// Write the final service worker file
const swOutputPath = join(publicDir, "firebase-messaging-sw.js");
writeFileSync(swOutputPath, withEnv);

console.log(
	"✅ firebase-messaging-sw.js generated with environment variables."
);
