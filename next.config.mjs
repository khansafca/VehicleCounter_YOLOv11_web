/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/html/:slug",
                destination: "/html/:slug.html",
            }
        ]
    }
};

export default nextConfig;
