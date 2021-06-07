const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";
module.exports = withPWA({
  async headers() {
    return [
      {
        source: "/about/",
        headers: [
          {
            key: "X-About-Custom-Header",
            value: "about_header_value",
          },
        ],
      },
      {
        source: "/media/",
        headers: [
          {
            key: "X-Media-Custom-Header",
            value: "media_header_value",
          },
        ],
      },
      {
        source: "/contacts/",
        headers: [
          {
            key: "X-Contacts-Custom-Header",
            value: "contacts_header_value",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n: {
    locales: ["en", "ru", "uz", "ae", "fr", "cn", "es"],
    defaultLocale: "ru",
    localeDetection: false,
  },
  images: {
    domains: ["smartbolla.com", "api.smartbolla.com", "dev.smartbolla.com"],
  },
  pwa: {
    dest: "public",
    disable: prod ? false : true,
  },
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    rollbarClientToken: "a665c3646ab94e19b3d66e396f59b49b",
  },
});
