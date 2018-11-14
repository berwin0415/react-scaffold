const path = require('path');
const paths = require('./paths');
const webpackCommon = require('./webpack.common.js')
const getClientEnvironment = require('./env');
// plugins
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const resolve = require('resolve');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

// 定义入口文件对象
const entryObj = {};
// 定义多入口文件的htmlWebpackPlugin数组
const htmlPlugins = []
// 定义公共路径
const publicPath = '/';
// 定义html文件的变量publicUrl
const publicUrl = '';
// 定义样式文件正则
const cssRegex = /\.css$/
const lessRegex = /\.less$/

/* 
 * 定义样式loader公共处理函数
 * @cssOptions object css options
 * @preProcessor string css预处理loader
 */
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: webpackCommon.postcssOptions
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};


// 处理入口文件
let entry = [{
  name: 'bundle',
  entry: [paths.appIndexJs],
  exportName: 'index'
}];
entry.forEach(item => {
  entryObj[item.name] = [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    ...item.entry
  ];
  htmlPlugins.push(new HtmlWebpackPlugin({
    inject: true,
    template: item.template || paths.appHtml,
    // html文件名
    filename: `${item.exportName ||item.name}.html`,
    // 多入口文件时，需要使用的入口文件
    chunks: [item.name]
  }))
})
// 处理环境变量
const env = getClientEnvironment(publicUrl);


module.exports = {
  // 开发模式
  mode: 'development',
  // 开发工具，设置source-map，
  devtool: 'cheap-module-source-map',
  // 入口文件
  entry: entryObj,
  // 输出文件
  output: {
    // 输出文件的目录,开发环境无用，生产环境使用
    // path: paths.appBuild,
    pathinfo: true,
    // 输出文件名
    filename: 'static/js/[name].js',
    // 非entry入口模块自动拆分，按需加载
    chunkFilename: 'static/js/[name].[hash:8].[chunckhash:16].js',
    // 文件输出的公共路径
    // publicPath: '/_static_/', //最终访问的路径就是：localhost:3000/_static_/js/*.js
    publicPath: publicPath,
    // 路径格式化，指向原始的磁盘路径，将'\'替换为'/'
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  // webpack4新增，主要是用来让开发者根据需要自定义一些优化构建打包的策略配置，
  optimization: {
    // minimize：true/false,告诉webpack是否开启代码最小化压缩，
    minimize: false,
    // runtimeChunk: 提取 webpack 运行时代码,它可以设置为：boolean、Object
    // 该配置开启时，会覆盖 入口指定的名称！！！
    runtimeChunk: true,
    // splitChunks ：取代了CommonsChunkPlugin，自动分包拆分、代码拆分，详细默认配置：
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 30000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   automaticNameDelimiter: '~',
    //   name: true,
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
    splitChunks: {
      chunks: 'all',
      name: false,
    }
  },
  // 配置模块如何解析，从webpack.common.js公共目录提取
  resolve: webpackCommon.commonResolve,
  module: {
    // 编译规则，loader
    rules: [
      // 使require.ensure失效当它不再是语言标准.
      {
        parser: {
          requireEnsure: false
        }
      },
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [{
          options: {
            formatter: require.resolve('react-dev-utils/eslintFormatter'),
            eslintPath: require.resolve('eslint'),
          },
          loader: require.resolve('eslint-loader'),
        }, ],
        include: paths.appSrc,
      },
      {
        // 当规则匹配时，只使用第一匹配规则的规则数组。
        oneOf: [
          // url-loader处理图片
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // babel-loader处理JS文件
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              // 开启babel-loader缓存
              cacheDirectory: true,
              // 取消缓存压缩
              cacheCompression: false,
            },
          },
          // 处理css
          {
            test: cssRegex,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
          // 处理less
          {
            test: lessRegex,
            use: getStyleLoaders({
              importLoaders: 2,
            }, 'less-loader'),
          },
          {
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.less/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    // 为html文件添加变量
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // 添加全局变量
    new webpack.ProvidePlugin({
      Ajax: path.resolve(process.cwd(), './src/client/common/ajax/index.js')
    }),
    // 启用模块热替换
    new webpack.HotModuleReplacementPlugin(),
    // 路径错误直接报错
    new CaseSensitivePathsPlugin(),
    // 优化moment.js库的体积
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  // 将一些在浏览器不起作用，但是在某些包中引用到的库置空
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

}
// // Webpack uses `publicPath` to determine where the app is being served from.
// // In development, we always serve from the root. This makes config easier.
// const publicPath = '/';

// // Check if TypeScript is setup
// const useTypeScript = fs.existsSync(paths.appTsConfig);

// // style files regexes
// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
// const sassRegex = /\.(scss|sass)$/;
// const sassModuleRegex = /\.module\.(scss|sass)$/;

// const getStyleLoaders = (cssOptions, preProcessor) => {
//   const loaders = [
//     require.resolve('style-loader'),
//     {
//       loader: require.resolve('css-loader'),
//       options: cssOptions,
//     },
//     {
//       // Options for PostCSS as we reference these options twice
//       // Adds vendor prefixing based on your specified browser support in
//       // package.json
//       loader: require.resolve('postcss-loader'),
//       options: {
//         // Necessary for external CSS imports to work
//         // https://github.com/facebook/create-react-app/issues/2677
//         ident: 'postcss',
//         plugins: () => [
//           require('postcss-flexbugs-fixes'),
//           require('postcss-preset-env')({
//             autoprefixer: {
//               flexbox: 'no-2009',
//             },
//             stage: 3,
//           }),
//         ],
//       },
//     },
//   ];
//   if (preProcessor) {
//     loaders.push(require.resolve(preProcessor));
//   }
//   return loaders;
// };

// // This is the development configuration.
// // It is focused on developer experience and fast rebuilds.
// // The production configuration is different and lives in a separate file.
// module.exports = {
//   mode: 'development',
//   // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
//   // See the discussion in https://github.com/facebook/create-react-app/issues/343
//   devtool: 'cheap-module-source-map',
//   // These are the "entry points" to our application.
//   // This means they will be the "root" imports that are included in JS bundle.
//   entry: [
//     // Include an alternative client for WebpackDevServer. A client's job is to
//     // connect to WebpackDevServer by a socket and get notified about changes.
//     // When you save a file, the client will either apply hot updates (in case
//     // of CSS changes), or refresh the page (in case of JS changes). When you
//     // make a syntax error, this client will display a syntax error overlay.
//     // Note: instead of the default WebpackDevServer client, we use a custom one
//     // to bring better experience for Create React App users. You can replace
//     // the line below with these two lines if you prefer the stock client:
//     // require.resolve('webpack-dev-server/client') + '?/',
//     // require.resolve('webpack/hot/dev-server'),
//     require.resolve('react-dev-utils/webpackHotDevClient'),
//     // Finally, this is your app's code:
//     paths.appIndexJs,
//     // We include the app code last so that if there is a runtime error during
//     // initialization, it doesn't blow up the WebpackDevServer client, and
//     // changing JS code would still trigger a refresh.
//   ],
//   output: {
//     // Add /* filename */ comments to generated require()s in the output.
//     pathinfo: true,
//     // This does not produce a real file. It's just the virtual path that is
//     // served by WebpackDevServer in development. This is the JS bundle
//     // containing code from all our entry points, and the Webpack runtime.
//     filename: 'static/js/bundle.js',
//     // There are also additional JS chunk files if you use code splitting.
//     chunkFilename: 'static/js/[name].chunk.js',
//     // This is the URL that app is served from. We use "/" in development.
//     publicPath: publicPath,
//     // Point sourcemap entries to original disk location (format as URL on Windows)
//     devtoolModuleFilenameTemplate: info =>
//       path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
//   },
//   optimization: {
//     // Automatically split vendor and commons
//     // https://twitter.com/wSokra/status/969633336732905474
//     // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
//     splitChunks: {
//       chunks: 'all',
//       name: false,
//     },
//     // Keep the runtime chunk seperated to enable long term caching
//     // https://twitter.com/wSokra/status/969679223278505985
//     runtimeChunk: true,
//   },
//   resolve: {
//     // This allows you to set a fallback for where Webpack should look for modules.
//     // We placed these paths second because we want `node_modules` to "win"
//     // if there are any conflicts. This matches Node resolution mechanism.
//     // https://github.com/facebook/create-react-app/issues/253
//     modules: ['node_modules'].concat(
//       // It is guaranteed to exist because we tweak it in `env.js`
//       process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
//     ),
//     // These are the reasonable defaults supported by the Node ecosystem.
//     // We also include JSX as a common component filename extension to support
//     // some tools, although we do not recommend using it, see:
//     // https://github.com/facebook/create-react-app/issues/290
//     // `web` extension prefixes have been added for better support
//     // for React Native Web.
//     extensions: paths.moduleFileExtensions
//       .map(ext => `.${ext}`)
//       .filter(ext => useTypeScript || !ext.includes('ts')),
//     alias: {
//       // Support React Native Web
//       // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
//       'react-native': 'react-native-web',
//       'kClient': path.resolve(process.cwd(),'./src/client')
//     },
//     plugins: [
//       // Adds support for installing with Plug'n'Play, leading to faster installs and adding
//       // guards against forgotten dependencies and such.
//       PnpWebpackPlugin,
//       // Prevents users from importing files from outside of src/ (or node_modules/).
//       // This often causes confusion because we only process files within src/ with babel.
//       // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
//       // please link the files into your node_modules/ and let module-resolution kick in.
//       // Make sure your source files are compiled, as they will not be processed in any way.
//       new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
//     ],
//   },
//   resolveLoader: {
//     plugins: [
//       // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
//       // from the current package.
//       PnpWebpackPlugin.moduleLoader(module),
//     ],
//   },
//   module: {
//     strictExportPresence: true,
//     rules: [
//       // Disable require.ensure as it's not a standard language feature.
//       { parser: { requireEnsure: false } },

//       // First, run the linter.
//       // It's important to do this before Babel processes the JS.
//       {
//         test: /\.(js|mjs|jsx)$/,
//         enforce: 'pre',
//         use: [
//           {
//             options: {
//               formatter: require.resolve('react-dev-utils/eslintFormatter'),
//               eslintPath: require.resolve('eslint'),

//             },
//             loader: require.resolve('eslint-loader'),
//           },
//         ],
//         include: paths.appSrc,
//       },
//       {
//         // "oneOf" will traverse all following loaders until one will
//         // match the requirements. When no loader matches it will fall
//         // back to the "file" loader at the end of the loader list.
//         oneOf: [
//           // "url" loader works like "file" loader except that it embeds assets
//           // smaller than specified limit in bytes as data URLs to avoid requests.
//           // A missing `test` is equivalent to a match.
//           {
//             test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
//             loader: require.resolve('url-loader'),
//             options: {
//               limit: 10000,
//               name: 'static/media/[name].[hash:8].[ext]',
//             },
//           },
//           // Process application JS with Babel.
//           // The preset includes JSX, Flow, and some ESnext features.
//           {
//             test: /\.(js|mjs|jsx|ts|tsx)$/,
//             include: paths.appSrc,
//             loader: require.resolve('babel-loader'),
//             options: {
//               customize: require.resolve(
//                 'babel-preset-react-app/webpack-overrides'
//               ),

//               plugins: [
//                 [
//                   require.resolve('babel-plugin-named-asset-import'),
//                   {
//                     loaderMap: {
//                       svg: {
//                         ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
//                       },
//                     },
//                   },
//                 ],
//               ],
//               // This is a feature of `babel-loader` for webpack (not Babel itself).
//               // It enables caching results in ./node_modules/.cache/babel-loader/
//               // directory for faster rebuilds.
//               cacheDirectory: true,
//               // Don't waste time on Gzipping the cache
//               cacheCompression: false,
//             },
//           },
//           // Process any JS outside of the app with Babel.
//           // Unlike the application JS, we only compile the standard ES features.
//           {
//             test: /\.(js|mjs)$/,
//             exclude: /@babel(?:\/|\\{1,2})runtime/,
//             loader: require.resolve('babel-loader'),
//             options: {
//               babelrc: false,
//               configFile: false,
//               compact: false,
//               presets: [
//                 [
//                   require.resolve('babel-preset-react-app/dependencies'),
//                   { helpers: true },
//                 ],
//               ],
//               cacheDirectory: true,
//               // Don't waste time on Gzipping the cache
//               cacheCompression: false,

//               // If an error happens in a package, it's possible to be
//               // because it was compiled. Thus, we don't want the browser
//               // debugger to show the original code. Instead, the code
//               // being evaluated would be much more helpful.
//               sourceMaps: false,
//             },
//           },
//           // "postcss" loader applies autoprefixer to our CSS.
//           // "css" loader resolves paths in CSS and adds assets as dependencies.
//           // "style" loader turns CSS into JS modules that inject <style> tags.
//           // In production, we use a plugin to extract that CSS to a file, but
//           // in development "style" loader enables hot editing of CSS.
//           // By default we support CSS Modules with the extension .module.css
//           {
//             test: cssRegex,
//             exclude: cssModuleRegex,
//             use: getStyleLoaders({
//               importLoaders: 1,
//             }),
//           },
//           // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
//           // using the extension .module.css
//           {
//             test: cssModuleRegex,
//             use: getStyleLoaders({
//               importLoaders: 1,
//               modules: true,
//               getLocalIdent: getCSSModuleLocalIdent,
//             }),
//           },
//           // Opt-in support for SASS (using .scss or .sass extensions).
//           // Chains the sass-loader with the css-loader and the style-loader
//           // to immediately apply all styles to the DOM.
//           // By default we support SASS Modules with the
//           // extensions .module.scss or .module.sass
//           {
//             test: sassRegex,
//             exclude: sassModuleRegex,
//             use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
//           },
//           // Adds support for CSS Modules, but using SASS
//           // using the extension .module.scss or .module.sass
//           {
//             test: sassModuleRegex,
//             use: getStyleLoaders(
//               {
//                 importLoaders: 2,
//                 modules: true,
//                 getLocalIdent: getCSSModuleLocalIdent,
//               },
//               'sass-loader'
//             ),
//           },
//           // "file" loader makes sure those assets get served by WebpackDevServer.
//           // When you `import` an asset, you get its (virtual) filename.
//           // In production, they would get copied to the `build` folder.
//           // This loader doesn't use a "test" so it will catch all modules
//           // that fall through the other loaders.
//           {
//             // Exclude `js` files to keep "css" loader working as it injects
//             // its runtime that would otherwise be processed through "file" loader.
//             // Also exclude `html` and `json` extensions so they get processed
//             // by webpacks internal loaders.
//             exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
//             loader: require.resolve('file-loader'),
//             options: {
//               name: 'static/media/[name].[hash:8].[ext]',
//             },
//           },
//         ],
//       },
//       // ** STOP ** Are you adding a new loader?
//       // Make sure to add the new loader(s) before the "file" loader.
//     ],
//   },
//   plugins: [
//     // Generates an `index.html` file with the <script> injected.
//     new HtmlWebpackPlugin({
//       inject: true,
//       template: paths.appHtml,
//     }),
//     // Makes some environment variables available in index.html.
//     // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
//     // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
//     // In development, this will be an empty string.
//     new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
//     // This gives some necessary context to module not found errors, such as
//     // the requesting resource.
//     new ModuleNotFoundPlugin(paths.appPath),
//     // Makes some environment variables available to the JS code, for example:
//     // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
//     new webpack.DefinePlugin(env.stringified),
//     // This is necessary to emit hot updates (currently CSS only):
//     new webpack.HotModuleReplacementPlugin(),
//     // Watcher doesn't work well if you mistype casing in a path so we use
//     // a plugin that prints an error when you attempt to do this.
//     // See https://github.com/facebook/create-react-app/issues/240
//     new CaseSensitivePathsPlugin(),
//     // If you require a missing module and then `npm install` it, you still have
//     // to restart the development server for Webpack to discover it. This plugin
//     // makes the discovery automatic so you don't have to restart.
//     // See https://github.com/facebook/create-react-app/issues/186
//     new WatchMissingNodeModulesPlugin(paths.appNodeModules),
//     // Moment.js is an extremely popular library that bundles large locale files
//     // by default due to how Webpack interprets its code. This is a practical
//     // solution that requires the user to opt into importing specific locales.
//     // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
//     // You can remove this if you don't use Moment.js:
//     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
//     // Generate a manifest file which contains a mapping of all asset filenames
//     // to their corresponding output file so that tools can pick it up without
//     // having to parse `index.html`.
//     new ManifestPlugin({
//       fileName: 'asset-manifest.json',
//       publicPath: publicPath,
//     }),
//     // TypeScript type checking
//     useTypeScript &&
//       new ForkTsCheckerWebpackPlugin({
//         typescript: resolve.sync('typescript', {
//           basedir: paths.appNodeModules,
//         }),
//         async: false,
//         checkSyntacticErrors: true,
//         tsconfig: paths.appTsConfig,
//         compilerOptions: {
//           module: 'esnext',
//           moduleResolution: 'node',
//           resolveJsonModule: true,
//           isolatedModules: true,
//           noEmit: true,
//           jsx: 'preserve',
//         },
//         reportFiles: [
//           '**',
//           '!**/*.json',
//           '!**/__tests__/**',
//           '!**/?(*.)(spec|test).*',
//           '!src/setupProxy.js',
//           '!src/setupTests.*',
//         ],
//         watch: paths.appSrc,
//         silent: true,
//         formatter: typescriptFormatter,
//       }),
//   ].filter(Boolean),

//   // Some libraries import Node modules but don't use them in the browser.
//   // Tell Webpack to provide empty mocks for them so importing them works.
//   node: {
//     dgram: 'empty',
//     fs: 'empty',
//     net: 'empty',
//     tls: 'empty',
//     child_process: 'empty',
//   },
//   // Turn off performance processing because we utilize
//   // our own hints via the FileSizeReporter
//   performance: false,
// };