const express = require('express'); 
const path = require('path');

const port = process.env.PORT || function() {throw 'Port is not specified';} ();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

app.use(router);

router.get('/svg-by-text/:text', function(req, res) {
    const text = decodeURIComponent(req.params.text);
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    const svgInfo = {width: 600, height: 600, fontFamily: 'Arial', fontSize: 60, text: text};
    
    res.render('svg.ejs', svgInfo);    
});

app.listen(port, function() {
    console.log('Application started');
});