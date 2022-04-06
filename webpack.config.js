const path = require("path");
const CopyWebpackPlugin= require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    mode:"development",
    devtool:"cheap-module-source-map",
    entry:{
        popup:path.resolve("src/popup/popup.tsx")
    },
    module:{
        rules:[
           {
               use:"ts-loader",
               test:/\.tsx?$/,
               exclude:/node_modules/ 
           }
        ]
    },
    plugins:[
        new CopyWebpackPlugin({
            patterns:[{
                from:path.resolve('src/manifest.json'),
                to:path.resolve('dist')
            }]
        }),
        new HtmlWebpackPlugin({
            title:"React Extension",
            filename:"popup.html",
            chunks:['popup']
        })
    ],
    resolve:{
        extensions:['.tsx', '.ts', '.js']
    },
    output:{
        filename:'[name].js',
        path:path.resolve('dist')
    }
}
