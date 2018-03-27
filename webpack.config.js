var config = {
   entry: './index.js',
	
   output: {
      path:'',
      filename: 'bundle.min.js',
   },
	
   devServer: {
      inline: true,
      port: 8085
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react','stage-0'],
               "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]
            }


         },
         {
            test: /(\.css)$/,
            loaders: ['style-loader', 'css-loader']
         }    
      ]
   }
   
}

module.exports = config;