const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@components': path.resolve(__dirname, 'src/components'),
        '@common': path.resolve(__dirname, 'src/components/common'),
        '@features': path.resolve(__dirname, 'src/components/features'),
        '@items': path.resolve(__dirname, 'src/components/items'),
        '@layout': path.resolve(__dirname, 'src/components/layout'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@icons': path.resolve(__dirname, 'src/assets/icons'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@apis': path.resolve(__dirname, 'src/apis')
    })
);