// const fs = require('fs');
// const http = require('http');
// const port = 3000;

// const halHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404);
//             res.write('file not found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     })
// }

// http
//     .createServer((req, res) => {
//     const url = req.url;
//     console.log(url);
//     // res.writeHead(200, {
//     //     'Content-Type' : 'text/html',
//     // });   

//     if (url === '/about') {
//         halHTML('./about.html', res);
//     } else if (url === '/contact') {
//         halHTML('./contact.html', res);
//     } else {
//         halHTML('./index.html', res);
//     }    
//     })
//     .listen(port, () => {
//         console.log(`server is listening port ${port}`);
//     });

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;
const morgan = require('morgan')

app.set('view engine', 'ejs');
app.use(expressLayouts);

// middleware
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

// built in middleware
app.use(express.static('public'))

// 3rd party middleware
app.use(morgan('dev')); 

app.get('/', (req, res, next) => {
    cont = [
        {
            name: 'Andika',
            email: 'andika@mail.com',
        },
        {
            name: 'Alya',
            email: 'alya@mail.com',
        },
        {
            name: 'Melani',
            email: 'melani@mail.com',
        },
    ]
    res.render('index',
        {
            nama: 'Alya',
            title: 'Webserver EJS',
            cont,
            layout: 'layout/main-layout',
        });
});

app.get('/about', (req, res, next) => {
    res.render('about', { title: 'about', layout: 'layout/main-layout', });
});

app.get('/contact', (req, res, next) => {
    res.render('contact', { title: 'contact', layout: 'layout/main-layout', });
});

app.get('/product/:id?', (req, res) => {
    res.send(`product id : ${req.params.id} <br> category id : ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404)
    res.send('Not Found 404')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});