module.exports = {
  reactStrictMode: true,
  webpack5: false,
  react: {
    useSuspense: false,
    wait: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        net: 'empty',
        fs: 'empty',
        tls: 'empty',
      };
    }

    return config;
  },
};
