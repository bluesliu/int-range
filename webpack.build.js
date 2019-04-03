const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: "production",
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: "index.js",
        // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
        libraryTarget: 'commonjs2'
    },
    // 通过正则命中所有以 react 或者 babel-runtime 开头的模块
    // 这些模块使用外部的，不能被打包进输出的代码里
    externals: /^(react|babel-runtime)/,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            }
        ]
    },
    // 输出 Source Map
    devtool: 'source-map'
};