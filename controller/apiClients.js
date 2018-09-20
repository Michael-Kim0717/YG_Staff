module.exports = app => {

	app.get('/', (req, res) => {
		res.render('index/index');
	});

	app.get('/home', (req, res) => {
		res.render('pages/home');
	});
    
};