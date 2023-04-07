const nextTranslate = require('next-translate-plugin');
const { defaultLocale, locales } = require('./i18n.js');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com', 'media.licdn.com', 'alisamurillo.com']
  },
  i18n: {
    locales,
    defaultLocale
  }
}

module.exports = nextTranslate(nextConfig);
