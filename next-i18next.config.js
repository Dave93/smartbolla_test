const path = require("path");
module.exports = {
  i18n: {
    locales: ["en", "ru", "uz", "ae", "fr", "cn", "es"],
    defaultLocale: "en",
    localePath: path.resolve("./public/static/locales"),
  },
  react: {
    useSuspense: true,
    wait: true,
  },
};
