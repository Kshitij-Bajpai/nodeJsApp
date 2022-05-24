var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));


var fortunes = [
    "Fortune number 1",
    "This is fortune number 2",
    "This could only be fortune number 3",
];


app.set('port', process.env.PORT || 3000);


var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// app.get('/', function (req, res) {
//     res.type('text/plain');
//     res.send('Meadowlark Travel');
// });
app.get('/', function (req, res) {
    res.render('home');
});

// app.get('/about', function (req, res) {
//     res.type('text/plain');
//     res.send('About Meadowlark Travel');
// });
app.get('/about', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    res.render('about', { fortune: randomFortune });
});

//custom 404 page
// app.use(function (req, res) {
//     res.type('text/plain');
//     res.status(404);
//     res.send('404 - Not Found');
// });
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

//custom 500 page
// app.use(function (req, res) {
//     res.type('text/plain');
//     res.status(500);
//     res.send('500 - Server Error');
// });
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})



