/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

try {
  // Validate configuration
  if (!config.plugins) {
    throw new Error('PostCSS plugins configuration is missing')
  }
} catch (error) {
  console.error('PostCSS configuration error:', error)
  process.exit(1)
}

export default config
