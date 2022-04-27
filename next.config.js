const {createSecureHeaders} = require('next-secure-headers');
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const {withSentryConfig} = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});


module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === "development",
          dest: 'public',
          dynamicStartUrl: false,
          mode: process.env.NODE_ENV,
        },
      },
      [
        withSentryConfig,
        {
          silent: true,
        },
      ],
      [withBundleAnalyzer],
    ]
  ],
  {


    async headers() {
      return [{source: "/(.*)", headers: createSecureHeaders()}];
    },


    images: {
      domains: ['images.prismic.io', 'charm.cdn.prismic.io'],
      disableStaticImages: true,
    },

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
      return config;

    }
  });