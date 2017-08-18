module.exports = (app) => {

	app.all('*', function(req, res, next) {
	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', '*');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,Accept,Authorization,multipart/form-data');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    next();
	    
	});

	app.get('/', (req, res) => {
	    res.send("node启动成功");
	});

	app.use('/api', require('./users')); // 在所有users路由前加/api
  
};