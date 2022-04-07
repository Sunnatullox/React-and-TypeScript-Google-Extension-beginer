const path = require("path");
const CopyWebpackPlugin= require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    mode:"development",
    devtool:"cheap-module-source-map",
    entry:{
        popup:path.resolve("src/popup/popup.tsx"),
        options:path.resolve("src/options/options.tsx")
    },
    module:{
        rules:[
           {
               use:"ts-loader",
               test: /\.tsx?$/,
               exclude:/node_modules/ 
           }
        ]
    },
    plugins:[
        new CopyWebpackPlugin({
            patterns:[{
                from:path.resolve('src/static'),
                to:path.resolve('dist')
                }
            ]
        }),
        ...getHtmlPlugns([
            'popup',
            'options'
        ])
    ],
    resolve:{
        extensions:['.tsx', '.ts', '.js']
    },
    output:{
        filename:'[name].js',
        path:path.resolve('dist')
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
}

function getHtmlPlugns(chunks){
    return chunks.map(chunk => new HtmlWebpackPlugin({
        title:"React Extension",
        filename:`${chunk}.html`,
        chunks:[chunk]
    }))
}
