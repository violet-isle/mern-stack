import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import partnersRoute from "./routes/partnersRoute.js";
import cors from 'cors';

const app = express();

//parse request middleware
app.use(express.json())

//handling CORS allowing custom origins, so only this frontend application can do these specific actions to effect the database

app.use(
    cors(/*{
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }*/)
);

//gives confirmation of connection upon visiting 
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Connected!.');
});

//uses the routing file provided
app.use('/community-partners', partnersRoute)

//connects to the mongo database and listens 
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    })