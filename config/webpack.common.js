const fs = require('fs')
const path = require('path');
const paths = require('./paths');

// 检查是否使用了typescript
const useTypeScript = fs.existsSync(paths.appTsConfig);
// 定义当前工作目录
const appDirectory = fs.realpathSync(process.cwd());

// 定义alies路径处理函数
const relativePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    // postcss配置
    postcssOptions: {
        ident: 'postcss',
        plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                    browsers: [
                        '> 1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9'
                    ]
                },
                stage: 3,
            }),
        ],
    },
    // 公共resolve配置
    commonResolve: {
        // webpack解析模块时应搜索的目录
        modules: ['node_modules'].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
        // 自动解析确定的扩展,省去你引入组件时写后缀的麻烦，
        extensions: paths.moduleFileExtensions
            .map(ext => `.${ext}`)
            .filter(ext => useTypeScript || !ext.includes('ts')),
        // 别名，非常重要的一个配置，它可以配置一些短路径
        alias: {
            Client: relativePath('src/client'),
            Modules: relativePath('src/modules')
        }
    }

}