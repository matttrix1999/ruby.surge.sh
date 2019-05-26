import webpack from 'webpack'
import { join, resolve } from 'path'
import fromPairs from 'lodash/fromPairs'
import ManifestPlugin from 'webpack-manifest-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default environment => {
  const mode = environment || 'development'
  const devMode = mode === 'development'
  return {
    mode,
    entry: {
      index: './index',
      mobile: './mobile'
    },
    output: {
      path: join(__dirname, 'assets'),
      filename: devMode ? '[name].js' : '[name]-[hash:12].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader?modules=true',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(jpe?g|svg)$/,
          loader: 'file-loader?name=[name]-[hash:4].[ext]'
        },
        {
          test: /\.(woff2?|ttf|eot)$/,
          loader: 'url-loader?name=[name]-[hash:4].[ext]&limit=65536'
        }
      ]
    },
    plugins: [
      new ManifestPlugin({
        fileName: 'webpack-assets.json'
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name]-[hash:12].css'
      }),
      new webpack.ProvidePlugin({
        client: 'superagent',
        Bowser: 'bowser',
        dayjs: 'dayjs'
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode
      })
    ],
    resolve: {
      alias: fromPairs([
        'components',
        'constants',
        'helpers',
        'locales',
        'models',
        'plugins',
        'routes',
        'static',
        'styles'
      ].map(name => [
        name,
        resolve(__dirname, name)
      ])),
      extensions: ['.js', '.css', '.sass', '.scss', '.json']
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
        new OptimizeCSSAssetsPlugin()
      ]
    }
  }
}
