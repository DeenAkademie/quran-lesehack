/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eigene Konfiguration für nicht-statische App
  // Deaktiviert die 404-Seite komplett statt export zu verwenden
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};

module.exports = nextConfig;
