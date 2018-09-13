const path = require("path");
const glob = require("glob");
const withTypescript = require("@zeit/next-typescript")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(__dirname, './tsconfig.json')
      }))
    }

    config.module.rules.push(
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "babel-loader",
          {
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  /* options */
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["styles", "node_modules"]
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )

    return config
  }
})