const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./mysqlDao.js');
//const dao = require('./sqliteDao.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/admin', (req, res)  => {
    res.status(200).sendFile('admin.html', {
        root: path.resolve('../public')
    });
})

app.get('/insertRating', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    dao.insertRating(ratee, stars, comment);

    response.status(200).send( {});
})

app.get('/insertMeme', (request, response)  => {
    dao.insertMeme(request.query.filepath, 1, "Test"); 

    response.status(200).send( {});
})

app.get('/getRatings', (request, response)  => {
    var answer;
    var rando = Math.random();
    if(rando >= 0.5)
    {
        answer = '<img src="https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-mobileMasterAt3x-v2.jpg>';
    }
    else if(rando < 0.5)
    {
        answer = '<img src="https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-mobileMasterAt3x-v2.jpg">';
    }
//'<img src="https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-mobileMasterAt3x-v2.jpg">'

    response.status(200).send( answer );
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});