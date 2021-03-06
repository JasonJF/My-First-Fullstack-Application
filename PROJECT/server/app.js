const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();
const dbService = require('./dbservice');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));


//create
app.post('/insert', (request, response) => {
    // console.log(request.body);
    const { name } = request.body;
    const db = dbService.getDbSericeInstance();

    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data : data}))
    .catch(err => console.log(err));
});

//read
app.get('/getAll', (request, response) => {
    // console.log('test');
    const db = dbService.getDbSericeInstance();
    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

//update

//delete
app.delete('/delete/:id', (request,response) => {
    // console.log(request.params);
    const { id } = request.params;
    const db = dbService.getDbSericeInstance();
    
    const result = db.deleteRowById(id);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
app.listen(process.env.PORT, () => console.log('app is running'));