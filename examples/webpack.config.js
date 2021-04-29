const fs = require('fs');
const path = require('path');
const webpack = require('webpack'); // 用于访问webpack内置插件

module.exports = {
  // 模式：通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化
  mode: 'development',

  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
  // __dirname:当前模块的目录名,__filename:当前模块的文件名（带路径） = __dirname + filename(文件名)
  // fs.readdirSync(__dirname)：方法将返回一个包含“指定目录（当前模块目录）下所有文件名称”的数组对象。
  entry:fs.readdirSync(__dirname).reduce((entries,dir)=>{
    // __dirname当前模块路径，dir当前__dirname路径下的文件名，fullDir就是当前模块下文件的绝对路径
    const fullDir = path.join(__dirname,dir)
    // 将每个文件下的 app.ts 文件作为打包入口 entry
    const entry = path.join(fullDir,'app.ts')
    // fs.statSync方法用于同步返回有关给定文件路径的信息。
    // 如果fullDir是目录，且存在 entry（即fullDir目录下存在app.ts）
    if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)){
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries
  }, {}),

  // 使用占位符，根据不同的目录名称，打包生成目标 js，名称和目录名一致
  // 注意，即使可以存在多个入口起点，但只指定一个输出配置。
  output: {
    path: path.join(__dirname, '__build__'), // 目标输出目录 path 的绝对路径
    filename: '[name].js',  // 用于输出文件的文件名
    publicPath: '/__build__'
  },

  // loader 让 webpack 能够去处理那些非 JS 文件（webpack 自身只理解 JS）
  module: {
    rules: [
      {
        // 用于标识出应该被对应 loader 进行转换的某个或某些文件
        test: /\.ts$/,
        enforce: 'pre',
        // 表示进行转换时，应该使用哪个 loader
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  // plugins 可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // webpack内置插件
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
