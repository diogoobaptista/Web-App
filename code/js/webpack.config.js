module.exports = {
    mode: 'development',
    devtool: false,
    devServer: {
        hot: false
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
    experiments: {
        topLevelAwait: true
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
}