import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import handlebars from 'express-handlebars';

import initSocket from './utils/sockets.js';
import connectionDB from './config/db/connection.js';
import __dirname from './config/config.js';

import routes from './routes/index.js';
import viewsRouter from './routes/views.routes.js';

const app = express();
const port = process.env.PORT || 8080;

const httpServer = app.listen( port , async () => {

    await connectionDB();
    const socketServer =  initSocket(httpServer);
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan('dev'));
    app.engine('handlebars', handlebars.engine());
    app.set('socketServer', socketServer);
    app.set('views', `${__dirname}/views`);
    app.set('view engine', 'handlebars');
    
    app.use('/static', express.static(__dirname + '/public'));
    app.use('/api', routes);
    app.use('/views', viewsRouter);

    app.get('**', (req, res) => {
        res.redirect('/views/home');
    });


    console.log(`Server is running on port ${port}`);
})












