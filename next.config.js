module.exports = {
  webpack: (config) => {
    config.externals = [...config.externals, '@prisma/client']
    return config
  }
}