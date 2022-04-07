const path = require("path");
const CopyWebpackPlugin= require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports={
    entry:{
        popup:path.resolve("src/popup/popup.tsx"),
        options:path.resolve("src/options/options.tsx"),
        background:path.resolve("src/background/background.ts"),
        contentScript:path.resolve("src/contentScript/contentScript.ts")
    },
    module:{
        rules:[
           {
               use:"ts-loader",
               test: /\.tsx?$/,
               exclude:/node_modules/ 
           },
           {
               use:["style-loader", "css-loader"],
               test:/\/.css?$/
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
        ]),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets:false
        })
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
