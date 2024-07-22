/**
 * @type {import('next').NextConfig}
 */
// next.config.js

const nextConfig = {
    images: {
        domains: ["blogger.googleusercontent.com", "images.unsplash.com"],
    },
    reactStrictMode: false, // Strict Modeを無効にする
    output: "standalone",
    env: {
        TZ: process.env.TZ || "Asia/Tokyo",
    },
    experimental: {
        externalDir: true,
    },
    webpack: (config, options) => {
        // Important: return the modified config
        config.module.rules.push({
            test: /canvas\.node/,
            use: "raw-loader",
        });
        return config;
    },
};

module.exports = nextConfig;
