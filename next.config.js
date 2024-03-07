/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil'
    })
    return config
  },
  images: {
    domains: ['uploadthing.com', 'utfs.io']
  },
  // This setting will create a folder at .next/standalone that copies only the necessary files for a production deployment and can then be deployed on its own without installing node_modules.
  // More info: https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
  output: 'standalone'
}

module.exports = nextConfig
