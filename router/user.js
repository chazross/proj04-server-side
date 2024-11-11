var users = [
    // Example users (username, password)
    { "uid": 1, "username": "ChazRoss", "password": "Cross777" },
    { "uid": 2, "username": "BobDylan", "password": "Bdylan777" }
];

var next_uid = 3;

/*************************************************************************
 * QUERY (GET) - Get all users
 *************************************************************************/
router.get("/", (req, res) => {       // localhost:5000/users/ [GET]
    console.log("handling localhost:5000/users GET");

    res.status(202).json({  // res.send(users)
        users: users
    });
});

/*************************************************************************
 * QUERY (GET) - Get specific user by username
 *************************************************************************/
router.get("/:username", async (req, res) => {       // localhost:5000/users/tonyStark [GET]
    const { username } = req.params;
    console.log("handling localhost:5000/users/" + username + " GET");

    let user = users.find(u => u.username === username);

    if (user) {
        res.status(202).json({  // res.send(user)
            user: user
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

/*************************************************************************
 * INSERT (POST) - User registration (sign up)
 *************************************************************************/
router.post("/register", async (req, res) => {       // localhost:5000/users/register [POST]
    console.log("handling localhost:5000/users/register POST");
    console.log(JSON.stringify(req.body));

    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({
            message: "Username already taken"
        });
    }

    // Add new user
    users.push({
        "uid": next_uid++,
        "username": username,
        "password": password
    });

    res.status(201).json({
        message: "User registered successfully"
    });
});

/*************************************************************************
 * QUERY (POST) - User login (authenticate)
 *************************************************************************/
router.post("/login", async (req, res) => {       // localhost:5000/users/login [POST]
    console.log("handling localhost:5000/users/login POST");
    console.log(JSON.stringify(req.body));

    const { username, password } = req.body;

    // Find user by username
    let user = users.find(u => u.username === username);

    if (user) {
        // Validate password
        if (user.password === password) {
            res.status(200).json({
                message: "Login successful",
                user: {
                    username: user.username
                }
            });
        } else {
            res.status(401).json({
                message: "Incorrect password"
            });
        }
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

/*************************************************************************
 * DELETE (DELETE) - Delete a user by username
 *************************************************************************/
router.delete("/:username", async (req, res) => {       // localhost:5000/users/tonyStark [DELETE]
    const { username } = req.params;
    console.log("handling localhost:5000/users/" + username + " DELETE");

    let idx = users.findIndex(u => u.username === username);

    if (idx !== -1) {
        users.splice(idx, 1);
        res.status(202).json({
            message: "User deleted"
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

export default router;
