import express from 'express';

const router = express.Router();

var data = [
    // Edgar Allen Poe Trivia
    {
        "qid": 1,
        "category": "Edgar Allen Poe",
        "question": "What year was Edgar Allen Poe’s “The Raven” first printed?",
        "answer": "1845"
    },
    {
        "qid": 2,
        "category": "Edgar Allen Poe",
        "question": "What story did Poe write that has similarities to Jack the Ripper murders?",
        "answer": "The Murders in the Rue Morgue"
    },
    {
        "qid": 3,
        "category": "Edgar Allen Poe",
        "question": "How many family members did Poe lose to tuberculosis?",
        "answer": "3"
    },

    // Odd Book Facts Trivia
    {
        "qid": 4,
        "category": "Odd Book Facts",
        "question": "What poison is found in the late 1800’s books with green cloth binding?",
        "answer": "Arsenic"
    },
    {
        "qid": 5,
        "category": "Odd Book Facts",
        "question": "What makes the scent of old books captivating?",
        "answer": "Volatile organic compounds (VOCs)"
    },
    {
        "qid": 6,
        "category": "Odd Book Facts",
        "question": "What are the books called that show an illustrated design when fanned out?",
        "answer": "Fore-edge paintings"
    },

    // Sherlock Holmes Trivia
    {
        "qid": 7,
        "category": "Sherlock Holmes",
        "question": "What was Sherlock Holmes' address?",
        "answer": "221B Baker Street"
    },
    {
        "qid": 8,
        "category": "Sherlock Holmes",
        "question": "What was the first story of Sherlock Holmes called?",
        "answer": "A Study in Scarlet"
    },
    {
        "qid": 9,
        "category": "Sherlock Holmes",
        "question": "Who was Sherlock Holmes' love interest?",
        "answer": "Irene Adler"
    }
];

var next_qid = 10;

/*************************************************************************
 * QUERY (GET)
 *************************************************************************/
router.get("/", (req, res) => {       // localhost:5000/trivia/ [GET]
    console.log("handling localhost:5000/trivia GET");

    res.status(202).json({  // res.send(data)
        trivia: data
    });
});

/*************************************************************************
 * QUERY (GET) by ID
 *************************************************************************/
router.get("/:qid", async (req, res) => {       // localhost:5000/trivia/1 [GET]
    const {qid} = req.params;
    console.log("handling localhost:5000/trivia/" + qid + " GET");

    let trivia = data.find((item) => item.qid === parseInt(qid));

    if (trivia) {
        res.status(202).json({  // res.send(trivia)
            trivia: trivia
        });
    } else {
        res.status(404).json({
            message: "Trivia not found"
        });
    }
});

/*************************************************************************
 * INSERT (POST)
 *************************************************************************/
router.post("/", async (req, res) => {       // localhost:5000/trivia/ [POST]
    console.log("handling localhost:5000/trivia POST");
    console.log(JSON.stringify(req.body));

    const {category, question, answer} = req.body;

    data = [...data, {
        "qid": next_qid++,
        "category": category,
        "question": question,
        "answer": answer
    }];

    res.status(202).json({  // res.send(data)
        message: "1 trivia added"
    });
});

/*************************************************************************
 * DELETE (DELETE)
 *************************************************************************/
router.delete("/:qid", async (req, res) => {       // localhost:5000/trivia/1 [DELETE]
    const {qid} = req.params;
    console.log("handling localhost:5000/trivia/" + qid + " DELETE");

    let idx = data.findIndex((item) => item.qid === parseInt(qid));

    if (idx !== -1) {
        data.splice(idx, 1);
        res.status(202).json({
            message: "1 trivia deleted"
        });
    } else {
        res.status(404).json({
            message: "Trivia not found"
        });
    }
});

export default router;
