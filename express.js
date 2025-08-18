import express, { response } from 'express';
// const __dirname = import.meta.dirname;
import bodyParser from 'body-parser';
import multer from 'multer';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

// Storage Object
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename : (req, file, callback) => {
        callback(null, file.originalname);
    }
})

var upload = multer({storage: storage}).fields([{ name:'file', maxCount: 1}]);

const urlEncodedParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/pages/uploadForm.html'));
// });

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        // check if successful
        if (err) return res.end('Error uploading file');
        // console/log(res.file)
        const username = req.body.username;
        const uploadedFile = req.files['file'][0];

        console.log(`Username: ${username}`);
        console.log(`File path: ${uploadedFile.path}`);
        res.end('File and form data uploaded successfully!');

    })
})

app.get('/studentForm', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html');
});

app.get('/getStudent', (req, res) => {
    var response = {
        firstName : req.query.firstName,
        lastName : req.query.lastName,
        studentId : req.query.studentId,
        section : req.query.section,
    }

    console.log("Response is: ", response);
    res.end(`Recieved Data: ${JSON.stringify(response)}`);
}); 

app.get('/adminForm', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/admin.html'));
    // res.sendFile(path.join(__dirname + '/pages/uploadForm.html'));
});

app.post('/postAdmin', urlEncodedParser, (req, res) => {
    upload(req, res, (err) => {
        // check if successful
        if (err) return res.end('Error uploading file');
        // console/log(res.file)
        const adminId = req.body.adminId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const department = req.body.department;
        const uploadedFile = req.files['file'][0];

        console.log(`Admin ID: ${adminId}`);
        console.log(`First Name: ${firstName}`);
        console.log(`Last Name: ${lastName}`);
        console.log(`Department: ${department}`);
        console.log(`File path: ${uploadedFile.path}`);
        res.end('File and form data uploaded successfully!');

    })

    // var response = {
    //     adminId : req.body.adminId,
    //     firstName : req.body.firstName,
    //     lastName : req.body.lastName,
    //     section : req.body.section,
    // }

    // console.log("Response is: ", response);
    // res.end(`Recieved Data: ${JSON.stringify(response)}`);
}); 


var server = app.listen(5000, 'localhost', () => {
    // const host = server.address().address;
    const port = server.address().port;
    // console.log ("Server running at http://%s:%s", host, port);
    // console.log ("Server running at http://"+ host+ ":" + port);
    // console.log (`Server running at http://${host}:${port}`);
    console.log (`Server running at http://localhost:${port}`);
})