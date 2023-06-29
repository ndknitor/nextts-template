/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/public'
            }
        ];
    }
}

module.exports = nextConfig
