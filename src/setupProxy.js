const { createProxyMiddleware } = require('http-proxy-middleware');
		module.exports = function(app) {
			app.use('/WebAPI', 
			createProxyMiddleware({ 
				target: 'http://smartflow.diskstation.me',
				changeOrigin: true,
				"pathRewrite":{
					"^/WebAPI":"/"
				} 
			}));
		
		};
