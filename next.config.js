/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'res.cloudinary.com', protocol: 'https', port: '' },
            {
                protocol : 'https',
                hostname : 'encrypted-tbn0.gstatic.com'
            },
            {
                protocol : 'https',
                hostname : "lh3.googleusercontent.com"
            },
            {
                protocol : 'https',
                hostname : "firebasestorage.googleapis.com"
            }
        ]
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig