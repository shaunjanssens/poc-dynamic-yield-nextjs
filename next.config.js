/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // Required:
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
            },
        ],
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
}

module.exports = nextConfig
