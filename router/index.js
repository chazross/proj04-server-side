import express from 'express';
import cors from 'cors'; 
import questions from './routers/questions.js';
import categories from './routers/categories.js'; 
import data from './routers/data.js';

const app = express();
app.use(express.json());
app.use(cors());  
app.use('/questions', questions);
app.use('/categories', categories); 


// Home route
app.get('/', (req, res) => {
    res.send('Proj04-Victorian Books');
});


// Start the server
app.listen(3003, () => {
    console.log('Listening on port 3003');
});

