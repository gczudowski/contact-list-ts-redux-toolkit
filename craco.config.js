const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@types': path.resolve(__dirname, 'src/types/'),
      config: path.resolve(__dirname, 'src/config/appConfig'),
    },
  },
};
