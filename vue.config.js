module.exports = {
  // 配置跨域请求
  devServer: {
    port: 80,
    proxy: {
      "/api": {
        target: "http://81.70.2.91:3000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/order": {
        target: "http://81.70.2.91:3000/order/",
        changeOrigin: true,
        pathRewrite: {
          "^/order": "",
        },
      },
      "/user": {
        target: "http://81.70.2.91:3000/user/",
        changeOrigin: true,
        pathRewrite: {
          "^/user": "",
        },
      },
      "/deliverer": {
        target: "http://81.70.2.91:3000/deliverer/",
        changeOrigin: true,
        pathRewrite: {
          "^/deliverer": "",
        },
      },
      "/cabinet": {
        target: "http://81.70.2.91:3000/cabinet/",
        changeOrigin: true,
        pathRewrite: {
          "^/cabinet": "",
        },
      },
    },
  },
}
