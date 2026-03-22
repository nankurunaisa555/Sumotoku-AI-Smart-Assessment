/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://livinghacks.jp https://*.livinghacks.jp",
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://livinghacks.jp',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
