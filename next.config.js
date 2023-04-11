const nextTranslate = require('next-translate-plugin');
const { defaultLocale, locales } = require('./i18n.js');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.licdn.com', process.env.NEXT_PUBLIC_SUPABASE_URL]
  },
  i18n: {
    locales,
    defaultLocale
  }
}

module.exports = nextTranslate(nextConfig);
