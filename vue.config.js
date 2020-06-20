module.exports = {
  lintOnSave: false, // 是否进行对代码对eslint检验,false不检验
 // runtimeCompiler:true,  // 是否包含vue编译器 在vue3.0中使用2.0的挂载dom需要配置这个才能不报错
  devServer: {
    port: 9999,
    proxy: {
      '/api': {
        target: 'http://localhost',
        ws: true,
        changeOrigin: true,
         pathRewrite:{
          '^/api':'/'
        }
      },
    }
  },  
}

module.exports = {
  lintOnSave: false, // 是否进行对代码对eslint检验,false不检验
 
}
