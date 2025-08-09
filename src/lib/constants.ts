export const MINIMUM_VALUE = 50_000;
export const MAXIMUM_VALUE = 100_000_000;

export const STABLE_COIN_RATES = {
	USDT: 1500,
	SOL: 1600,
	BTC: 2000,
} as const;

export const MAX_IMAGE_SIZE = 7 * 1024 * 1024; // 7MB

export const ALLOWED_IMAGE_FILES = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/svg+xml",
	"image/gif",
];

export const PAGE_SIZE = 10;

export const BVN_REGEX = /^\d{11}$/;

export const ALL_SAME_DIGIT_REGEX = /^(\d)\1{10}$/;
