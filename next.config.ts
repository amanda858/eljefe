import type { NextConfig } from "next";

const allowedDevOrigins = [
    "*.app.github.dev",
    "*.github.dev",
    "*.githubpreview.dev",
    ...(process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? []),
]
    .map((origin) => origin.trim())
    .filter(Boolean);

const nextConfig: NextConfig = {
    allowedDevOrigins,
    reactStrictMode: true,
};

export default nextConfig;