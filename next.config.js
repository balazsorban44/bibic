const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
require("dotenv").config()

module.exports = {
  webpack: (config) => {
    const tsconfig = new TsconfigPathsPlugin({
      extensions: [".js", ".jsx"]
    })
    if (config.resolve.plugins) {
      config.resolve.plugins.push(tsconfig)
    } else {
      config.resolve.plugins = [tsconfig]
    }
    return config
  },
  env: {
    "DOMAIN": process.env.DOMAIN,
    "VERSION": process.env.VERSION,
    "DEFAULT_LOCALE": process.env.DEFAULT_LOCALE,
    "API_KEY": process.env.API_KEY,
    "AUTH_DOMAIN": process.env.AUTH_DOMAIN,
    "DATABASE_URL": process.env.DATABASE_URL,
    "PROJECT_ID": process.env.PROJECT_ID,
    "STORAGE_BUCKET": process.env.STORAGE_BUCKET,
    "MESSAGING_SENDER_ID": process.env.MESSAGING_SENDER_ID,
    "CLOUD_FUNCTION_URL": process.env.CLOUD_FUNCTION_URL,
    "NEXT_PUBLIC_MAP_API_KEY": "AIzaSyDvnPguJofFhvUbJiNYkR2rlzSvIeZhco8",
    "MAP_URL": process.env.MAP_URL,
    "MAP_ZOOM": process.env.MAP_ZOOM,
    "MAP_LAT": process.env.MAP_LAT,
    "MAP_LONG": process.env.MAP_LONG,
    "ADDRESS": process.env.ADDRESS,
    "TEL_SHORT": process.env.TEL_SHORT,
    "TEL_LONG": process.env.TEL_LONG,
    "FACEBOOK_URL": process.env.FACEBOOK_URL,
    "INSTAGRAM_URL": process.env.INSTAGRAM_URL,
    "YOUTUBE_URL": process.env.YOUTUBE_URL,
    "BOOS_GERGO_URL": process.env.BOOS_GERGO_URL,
    "BALAZS_ORBAN_URL": process.env.BALAZS_ORBAN_URL
  },
  target: "serverless"
}