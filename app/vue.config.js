module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASE_URL : "/",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  crossorigin: "use-credentials",
  devServer: {
    open: process.platform === "linux",
    host: "localhost",
    port: 3200
  }
};
