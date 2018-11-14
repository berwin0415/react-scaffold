const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const path = require('path');
const paths = require('./paths');
const webpackCommon = require('./webpack.common.js')
const getClientEnvironment = require('./env');
// plugins
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
//使用tenser来压缩js的插件
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');

// 定义入口文件对象
const entryObj = {};
// 定义多入口文件的htmlWebpackPlugin数组
const htmlPlugins = []
// 定义公共路径
const publicPath = paths.servedPath;
// 定义html文件的变量publicUrl
const publicUrl = '';
// 定义样式文件正则
const cssRegex = /\.css$/
const lessRegex = /\.less$/

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';


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
    ...item.entry
  ];
  htmlPlugins.push(new HtmlWebpackPlugin({
    inject: true,
    template: item.template || paths.appHtml,
    // html文件名
    filename: `${item.exportName ||item.name}.html`,
    // 多入口文件时，需要使用的入口文件
    chunks: [item.name],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }
  }))
})
// 处理环境变量
const env = getClientEnvironment(publicUrl);


module.exports = {
  // 生产模式
  mode: 'production',
  // 开发工具，设置source-map，
  devtool: 'source-map',
  bail: true,
  // 入口文件
  entry: entryObj,
  // 输出文件
  output: {
    // 输出文件的目录,开发环境无用，生产环境使用
    path: paths.appBuild,
    pathinfo: true,
    // 输出文件名
    filename: 'static/js/[name].js',
    // 非entry入口模块自动拆分，按需加载
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    // 文件输出的公共路径
    // publicPath: '/_static_/', //最终访问的路径就是：localhost:3000/_static_/js/*.js
    publicPath: publicPath,
    // 路径格式化，指向原始的磁盘路径，将'\'替换为'/'
    devtoolModuleFilenameTemplate: info => path.resolve(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
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
              cacheCompression: true,
              compact: true
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // 解析
          parse: {
            // ES8
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
      }),
    ],
    // Automatically split vendor and commons
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  plugins: [
    ...htmlPlugins,
    shouldInlineRuntimeChunk && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
    // 为html文件添加变量
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // 模块未找到处理报错处理插件
    new ModuleNotFoundPlugin(paths.appPath),

    // 添加全局变量
    new webpack.ProvidePlugin({
      Ajax: path.resolve(process.cwd(), './src/client/common/ajax/index.js')
    }),
    // 路径错误直接报错
    new CaseSensitivePathsPlugin(),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    // 优化moment.js库的体积
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ],
  // 将一些在浏览器不起作用，但是在某些包中引用到的库置空
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: false,
}





// const fs = require('fs');
// const path = require('path');
// const webpack = require('webpack');
// const resolve = require('resolve');
// const PnpWebpackPlugin = require('pnp-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const safePostCssParser = require('postcss-safe-parser');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
// const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
// const paths = require('./paths');
// const getClientEnvironment = require('./env');
// const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
// const typescriptFormatter = require('react-dev-utils/typescriptFormatter');


// // Webpack uses `publicPath` to determine where the app is being served from.
// // It requires a trailing slash, or the file assets will get an incorrect path.
// const publicPath = paths.servedPath;
// // Some apps do not use client-side routing with pushState.
// // For these, "homepage" can be set to "." to enable relative asset paths.
// const shouldUseRelativeAssetPaths = publicPath === './';
// // Source maps are resource heavy and can cause out of memory issue for large source files.
// const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// // Some apps do not need the benefits of saving a web request, so not inlining the chunk
// // makes for a smoother build process.
// const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';
// // `publicUrl` is just like `publicPath`, but we will provide it to our app
// // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// const publicUrl = publicPath.slice(0, -1);
// // Get environment variables to inject into our app.
// const env = getClientEnvironment(publicUrl);

// // Assert this just to be safe.
// // Development builds of React are slow and not intended for production.
// if (env.stringified['process.env'].NODE_ENV !== '"production"') {
//   throw new Error('Production builds must have NODE_ENV=production.');
// }

// // Check if TypeScript is setup
// const useTypeScript = fs.existsSync(paths.appTsConfig);

// // style files regexes
// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
// const sassRegex = /\.(scss|sass)$/;
// const sassModuleRegex = /\.module\.(scss|sass)$/;

// // common function to get style loaders
// const getStyleLoaders = (cssOptions, preProcessor) => {
//   const loaders = [{
//       loader: MiniCssExtractPlugin.loader,
//       options: Object.assign({},
//         shouldUseRelativeAssetPaths ? {
//           publicPath: '../../'
//         } : undefined
//       ),
//     },
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
//         sourceMap: shouldUseSourceMap,
//       },
//     },
//   ];
//   if (preProcessor) {
//     loaders.push({
//       loader: require.resolve(preProcessor),
//       options: {
//         sourceMap: shouldUseSourceMap,
//       },
//     });
//   }
//   return loaders;
// };

// // This is the production configuration.
// // It compiles slowly and is focused on producing a fast and minimal bundle.
// // The development configuration is different and lives in a separate file.
// module.exports = {
//   mode: 'production',
//   // Don't attempt to continue if there are any errors.
//   bail: true,
//   // We generate sourcemaps in production. This is slow but gives good results.
//   // You can exclude the *.map files from the build during deployment.
//   devtool: shouldUseSourceMap ? 'source-map' : false,
//   // In production, we only want to load the app code.
//   entry: [paths.appIndexJs],
//   output: {
//     // The build folder.
//     path: paths.appBuild,
//     // Generated JS file names (with nested folders).
//     // There will be one main bundle, and one file per asynchronous chunk.
//     // We don't currently advertise code splitting but Webpack supports it.
//     filename: 'static/js/[name].[chunkhash:8].js',
//     chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
//     // We inferred the "public path" (such as / or /my-project) from homepage.
//     publicPath: publicPath,
//     // Point sourcemap entries to original disk location (format as URL on Windows)
//     devtoolModuleFilenameTemplate: info =>
//       path
//       .relative(paths.appSrc, info.absoluteResourcePath)
//       .replace(/\\/g, '/'),
//   },
//   optimization: {
//     minimizer: [
//       new TerserPlugin({
//         terserOptions: {
//           parse: {
//             // we want terser to parse ecma 8 code. However, we don't want it
//             // to apply any minfication steps that turns valid ecma 5 code
//             // into invalid ecma 5 code. This is why the 'compress' and 'output'
//             // sections only apply transformations that are ecma 5 safe
//             // https://github.com/facebook/create-react-app/pull/4234
//             ecma: 8,
//           },
//           compress: {
//             ecma: 5,
//             warnings: false,
//             // Disabled because of an issue with Uglify breaking seemingly valid code:
//             // https://github.com/facebook/create-react-app/issues/2376
//             // Pending further investigation:
//             // https://github.com/mishoo/UglifyJS2/issues/2011
//             comparisons: false,
//             // Disabled because of an issue with Terser breaking valid code:
//             // https://github.com/facebook/create-react-app/issues/5250
//             // Pending futher investigation:
//             // https://github.com/terser-js/terser/issues/120
//             inline: 2,
//           },
//           mangle: {
//             safari10: true,
//           },
//           output: {
//             ecma: 5,
//             comments: false,
//             // Turned on because emoji and regex is not minified properly using default
//             // https://github.com/facebook/create-react-app/issues/2488
//             ascii_only: true,
//           },
//         },
//         // Use multi-process parallel running to improve the build speed
//         // Default number of concurrent runs: os.cpus().length - 1
//         parallel: true,
//         // Enable file caching
//         cache: true,
//         sourceMap: shouldUseSourceMap,
//       }),
//       new OptimizeCSSAssetsPlugin({
//         cssProcessorOptions: {
//           parser: safePostCssParser,
//           map: shouldUseSourceMap ?
//             {
//               // `inline: false` forces the sourcemap to be output into a
//               // separate file
//               inline: false,
//               // `annotation: true` appends the sourceMappingURL to the end of
//               // the css file, helping the browser find the sourcemap
//               annotation: true,
//             } :
//             false,
//         },
//       }),
//     ],
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
//       {
//         parser: {
//           requireEnsure: false
//         }
//       },

//       // First, run the linter.
//       // It's important to do this before Babel processes the JS.
//       {
//         test: /\.(js|mjs|jsx)$/,
//         enforce: 'pre',
//         use: [{
//           options: {
//             formatter: require.resolve('react-dev-utils/eslintFormatter'),
//             eslintPath: require.resolve('eslint'),

//           },
//           loader: require.resolve('eslint-loader'),
//         }, ],
//         include: paths.appSrc,
//       },
//       {
//         // "oneOf" will traverse all following loaders until one will
//         // match the requirements. When no loader matches it will fall
//         // back to the "file" loader at the end of the loader list.
//         oneOf: [
//           // "url" loader works just like "file" loader but it also embeds
//           // assets smaller than specified size as data URLs to avoid requests.
//           {
//             test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
//             loader: require.resolve('url-loader'),
//             options: {
//               limit: 10000,
//               name: 'static/media/[name].[hash:8].[ext]',
//             },
//           },
//           // Process application JS with Babel.
//           // The preset includes JSX, Flow, TypeScript and some ESnext features.
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
//               cacheDirectory: true,
//               // Save disk space when time isn't as important
//               cacheCompression: true,
//               compact: true,
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
//                   {
//                     helpers: true
//                   },
//                 ],
//               ],
//               cacheDirectory: true,
//               // Save disk space when time isn't as important
//               cacheCompression: true,

//               // If an error happens in a package, it's possible to be
//               // because it was compiled. Thus, we don't want the browser
//               // debugger to show the original code. Instead, the code
//               // being evaluated would be much more helpful.
//               sourceMaps: false,
//             },
//           },
//           // "postcss" loader applies autoprefixer to our CSS.
//           // "css" loader resolves paths in CSS and adds assets as dependencies.
//           // `MiniCSSExtractPlugin` extracts styles into CSS
//           // files. If you use code splitting, async bundles will have their own separate CSS chunk file.
//           // By default we support CSS Modules with the extension .module.css
//           {
//             test: cssRegex,
//             exclude: cssModuleRegex,
//             loader: getStyleLoaders({
//               importLoaders: 1,
//               sourceMap: shouldUseSourceMap,
//             }),
//             // Don't consider CSS imports dead code even if the
//             // containing package claims to have no side effects.
//             // Remove this when webpack adds a warning or an error for this.
//             // See https://github.com/webpack/webpack/issues/6571
//             sideEffects: true,
//           },
//           // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
//           // using the extension .module.css
//           {
//             test: cssModuleRegex,
//             loader: getStyleLoaders({
//               importLoaders: 1,
//               sourceMap: shouldUseSourceMap,
//               modules: true,
//               getLocalIdent: getCSSModuleLocalIdent,
//             }),
//           },
//           // Opt-in support for SASS. The logic here is somewhat similar
//           // as in the CSS routine, except that "sass-loader" runs first
//           // to compile SASS files into CSS.
//           // By default we support SASS Modules with the
//           // extensions .module.scss or .module.sass
//           {
//             test: sassRegex,
//             exclude: sassModuleRegex,
//             loader: getStyleLoaders({
//                 importLoaders: 2,
//                 sourceMap: shouldUseSourceMap,
//               },
//               'sass-loader'
//             ),
//             // Don't consider CSS imports dead code even if the
//             // containing package claims to have no side effects.
//             // Remove this when webpack adds a warning or an error for this.
//             // See https://github.com/webpack/webpack/issues/6571
//             sideEffects: true,
//           },
//           // Adds support for CSS Modules, but using SASS
//           // using the extension .module.scss or .module.sass
//           {
//             test: sassModuleRegex,
//             loader: getStyleLoaders({
//                 importLoaders: 2,
//                 sourceMap: shouldUseSourceMap,
//                 modules: true,
//                 getLocalIdent: getCSSModuleLocalIdent,
//               },
//               'sass-loader'
//             ),
//           },
//           // "file" loader makes sure assets end up in the `build` folder.
//           // When you `import` an asset, you get its filename.
//           // This loader doesn't use a "test" so it will catch all modules
//           // that fall through the other loaders.
//           {
//             loader: require.resolve('file-loader'),
//             // Exclude `js` files to keep "css" loader working as it injects
//             // it's runtime that would otherwise be processed through "file" loader.
//             // Also exclude `html` and `json` extensions so they get processed
//             // by webpacks internal loaders.
//             exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
//             options: {
//               name: 'static/media/[name].[hash:8].[ext]',
//             },
//           },
//           // ** STOP ** Are you adding a new loader?
//           // Make sure to add the new loader(s) before the "file" loader.
//         ],
//       },
//     ],
//   },
//   plugins: [
//     // Generates an `index.html` file with the <script> injected.
//     new HtmlWebpackPlugin({
//       inject: true,
//       template: paths.appHtml,
//       minify: {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeRedundantAttributes: true,
//         useShortDoctype: true,
//         removeEmptyAttributes: true,
//         removeStyleLinkTypeAttributes: true,
//         keepClosingSlash: true,
//         minifyJS: true,
//         minifyCSS: true,
//         minifyURLs: true,
//       },
//     }),
//     // Inlines the webpack runtime script. This script is too small to warrant
//     // a network request.
//     shouldInlineRuntimeChunk &&
//     new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
//     // Makes some environment variables available in index.html.
//     // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
//     // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
//     // In production, it will be an empty string unless you specify "homepage"
//     // in `package.json`, in which case it will be the pathname of that URL.
//     new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
//     // This gives some necessary context to module not found errors, such as
//     // the requesting resource.
//     new ModuleNotFoundPlugin(paths.appPath),
//     // Makes some environment variables available to the JS code, for example:
//     // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
//     // It is absolutely essential that NODE_ENV was set to production here.
//     // Otherwise React will be compiled in the very slow development mode.
//     new webpack.DefinePlugin(env.stringified),
//     new MiniCssExtractPlugin({
//       // Options similar to the same options in webpackOptions.output
//       // both options are optional
//       filename: 'static/css/[name].[contenthash:8].css',
//       chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
//     }),
//     // Generate a manifest file which contains a mapping of all asset filenames
//     // to their corresponding output file so that tools can pick it up without
//     // having to parse `index.html`.
//     new ManifestPlugin({
//       fileName: 'asset-manifest.json',
//       publicPath: publicPath,
//     }),
//     // Moment.js is an extremely popular library that bundles large locale files
//     // by default due to how Webpack interprets its code. This is a practical
//     // solution that requires the user to opt into importing specific locales.
//     // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
//     // You can remove this if you don't use Moment.js:
//     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
//     // Generate a service worker script that will precache, and keep up to date,
//     // the HTML & assets that are part of the Webpack build.
//     new WorkboxWebpackPlugin.GenerateSW({
//       clientsClaim: true,
//       exclude: [/\.map$/, /asset-manifest\.json$/],
//       importWorkboxFrom: 'cdn',
//       navigateFallback: publicUrl + '/index.html',
//       navigateFallbackBlacklist: [
//         // Exclude URLs starting with /_, as they're likely an API call
//         new RegExp('^/_'),
//         // Exclude URLs containing a dot, as they're likely a resource in
//         // public/ and not a SPA route
//         new RegExp('/[^/]+\\.[^/]+$'),
//       ],
//     }),
//     // TypeScript type checking
//     fs.existsSync(paths.appTsConfig) &&
//     new ForkTsCheckerWebpackPlugin({
//       typescript: resolve.sync('typescript', {
//         basedir: paths.appNodeModules,
//       }),
//       async: false,
//       checkSyntacticErrors: true,
//       tsconfig: paths.appTsConfig,
//       compilerOptions: {
//         module: 'esnext',
//         moduleResolution: 'node',
//         resolveJsonModule: true,
//         isolatedModules: true,
//         noEmit: true,
//         jsx: 'preserve',
//       },
//       reportFiles: [
//         '**',
//         '!**/*.json',
//         '!**/__tests__/**',
//         '!**/?(*.)(spec|test).*',
//         '!src/setupProxy.js',
//         '!src/setupTests.*',
//       ],
//       watch: paths.appSrc,
//       silent: true,
//       formatter: typescriptFormatter,
//     }),
//     new BundleAnalyzerPlugin({
//       analyzerMode: 'static'
//     })
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