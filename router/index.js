import express from 'express';
import cors from 'cors'; 
import questions from './categories.js';
import categories from './categories.js'; 
import bodyParser from 'body-parser';
import { Sequelize, Model, DataTypes } from 'sequelize';

const app = express();
app.use(express.json());
app.use(cors());  
app.use('/questions', questions);
app.use('/categories', categories); 

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });


  const categoriesData = [
    { categoryName: 'Edgar Allan Poe' , categoryID : 1 },
    { categoryName: 'Odd Book Facts' ,categoryID : 2}, 
    { categoryName: 'Sherlock Holmes', categoryID : 3 },

];

const questionsData = [
    {
        questionText: 'What year was Edgar Allen Poe’s “The Raven” first printed?',
      answer: '1845',
      categoryID: 1 // Poe
    },
    {
        questionText: 'What story did Poe write that has similarities to Jack the Ripper murders?',
      answer: 'The Murders in the Rue Morgue',
      categoryID: 1 // Poe
    },
    {
        questionText: 'How many family members did Poe lose to tuberculosis?',
      answer: 'Three. His wife, mother and tep-mother',
      categoryID: 1 // Poe
    },
    {
        questionText: 'What poison is found in the late 1800’s books with green cloth binding?',
      answer: 'Arsenic',
      categoryID: 2 // Odd
    },
    {
        questionText: 'What makes the scent of old books captivating?',
      answer: 'It comes from the breakdown of lignin in the paper and the materials used in the binding',
      categoryID: 2 // Odd 
    },
    {
        questionText: 'What are the books called that show an illustrated design when fanned out?',
      answer: 'Fore-edge-books',
      categoryID: 2 // Odd 
    },
    {
        questionText: 'What was Sherlock Holmes address?',
      answer: '221B Baker Street',
      categoryID: 3 // Sherlock
    },
    {
        questionText: 'What was the first story of Sherlock Holmes called?',
      answer: 'A Study in Scarlet',
      categoryID: 3 // Sherlock
    },
    {
        questionText: 'Who was Sherlock Holmes love interest?',
      answer: 'Irene Adler',
      categoryID: 3 // Sherlock
    },
]



  // Define User model
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });


// Category Model
class Category extends Model {}
Category.init({
  categoryID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'category' });

// Question Model
class Question extends Model {}
Question.init({
  questionText: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'categoryID'
    }
  }
}, { sequelize, modelName: 'question' });

// Define association
Category.hasMany(Question, { foreignKey: 'categoryID' });
Question.belongsTo(Category, { foreignKey: 'categoryID' });
// Sync models with database and insert predefined data
sequelize.sync({ force: true }).then(async () => {
    // Insert categories
    const categories = await Category.bulkCreate(categoriesData);
    // Map questions to categories
    const questions = questionsData.map((question) => {
        // const category = categories.find(cat => cat.categoryID === question.categoryID);
        // console.log("Category " +  categories)
        return {
            questionText: question.questionText,
            answer: question.answer,
            categoryID: question.categoryID
        };
    });

    // Insert questions
    await Question.bulkCreate(questions);
    console.log('Database seeded with predefined categories and questions.');
});


// Connecting to the database
// const connection = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "book_facts"
// });



// Home route
app.get('/', (req, res) => {
    res.send('Proj04-Victorian Books');
});

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });
  
  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  });
  
  app.post('/users', async (req, res) => {
    //print(req);
    const user = await User.create(req.body);
    res.json(user);
  });


  app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ where: { name } });

        // Check if user exists and password matches
        if (user && user.password === password) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.post('/questions', async (req, res) => {
    try {
        const { questionText, answer, categoryID } = req.body;
        
        // Ensure categoryID exists
        const category = await Category.findByPk(categoryID);
        if (!category) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const question = await Question.create({ questionText, answer, categoryID });
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: 'Error creating question', error });
    }
});

// Fetch all questions with their categories
app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.findAll({
            include: { model: Category, attributes: ['categoryName'] }
        });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});

// Route to get all categories
app.get('/allcategories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

// Route to get questions by categoryID
app.get('/questions/category/:categoryID', async (req, res) => {
    try {
        const { categoryID } = req.params;
        
        // Check if the category exists
        const category = await Category.findByPk(categoryID);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find all questions that belong to this categoryID
        const questions = await Question.findAll({
            where: { categoryID },
            include: { model: Category, attributes: ['categoryName'] }
        });
        
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions by category', error });
    }
});

// Start the server
app.listen(3003, () => {
    console.log('Listening on port 3003');
});

