const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const DEV = {
  '/api': {
      //测试环境api
      target: 'http://openapi.tuling123.com/openapi', // target host online
      // ws: true,  // proxy websockets 
      changeOrigin: true, // true为允许跨域needed for virtual hosted sites
      ws:false,
      pathRewrite: {
          '^/api': '' // rewrite path 
      }
  }
}
const PRO = {
  '/host': {
      target: '生产环境host', // target host online
      // ws: true,  // proxy websockets 
      changeOrigin: true, // true为允许跨域needed for virtual hosted sites
      ws:false,
      pathRewrite: {
          '^/host': '' // rewrite path 
      }
  }
}

module.exports = {
  publicPath:'./',
  assetsDir: 'static',
  filenameHashing: true,
  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],
  // 生产环境 sourceMap
  productionSourceMap: false,
  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: (config) => {},
  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {
    // 修复HMR(热更新)失效
    config.resolve.symlinks(true);
  },
  css: {
    // 打包时打开此选项
    extract: process.env.NODE_ENV === 'production'
    ? true
    : false,
    // 开启 CSS source maps?
    sourceMap:  process.env.NODE_ENV === 'production'
    ? false
    : true,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7'],
            grid:true
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
          })
        ]
      }
    }
  },
  // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      open: true, //自动开启
      disableHostCheck: true,
      //   host: 'localhost',
      //   port: 3000,
      //   https: false,
      //   hotOnly: false,
      //通过webpack来处理跨域问题
      proxy: process.env.NODE_ENV === 'production'
      ? PRO
      : DEV,
      before: app => {
          
      }
  },
  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {}
};
