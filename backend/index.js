import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import partnersRoute from "./routes/partnersRoute.js";
import cors from 'cors';

const app = express();

//parse request middleware
app.use(express.json())

//handling CORS allowing all origins
//app.use(cors());
//handling CORS allowing custom origins

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })    
);


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('never working.');
});

app.use('/community-partners', partnersRoute)

mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
        
    })
    .catch((error)=> {
        console.log(error);
    })