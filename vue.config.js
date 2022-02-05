module.exports = {
    // 选项...
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://110.42.134.163',
                target: 'http://localhost:8888', // 本地
                pathRewrite: { '^/api': '' } // 本地
                // ws: true,
                // changeOrigin: true
            },
            '/ws': {
                // target: 'http://110.42.134.163',
                target: 'ws://localhost:8888', // 本地
            }
        }
    },
}