const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// GET all users
router.get("/", (req, res) => {
 res.status(200).json({ message: "I'm alive!" });
});

// GET user by their username
router.get("/user", (req, res) => {
 res.status(200).json({ message: "I'm alive!" });
});

// POST a user to register
router.post("/register", (req, res) => {
 const user = req.body;

 console.log(user);

 res.status(201).json({ message: "I'm alive!" });
});

// POST a user to login
router.post("/login", (req, res) => {
    // Extract the username and password from the request body
    const { username, password } = req.body;
    // Placeholder user object - later we will fetch the real user from the database
    const DBuser = {
      username: "test",
      password: "pass1",
    };
   
    // Hash the password from the request body using bcrypt
    // Later we will compare this hash to the hash stored in the database
    // But for now, we will just do it manually
    const hashedPassword = bcrypt.hashSync(DBuser.password, 14);
   
    // Check if the user exists and the password matches using bcrypt
    if (DBuser && bcrypt.compareSync(password, hashedPassword)) {
      // Generate a JSON Web Token (JWT) for the user
      const token = generateToken(DBuser);
      // Send a success response with the JWT and user data
      res
        .status(200)
        .json({ message: `Welcome ${DBuser.username}!`, token, DBuser });
    } else {
      // Send an error response if the credentials are invalid
      res.status(401).json({ message: "Invalid credentials" });
    }
   });
router.post("/login", (req, res) => {
 // Extract the username and password from the request body
 const { username, password } = req.body;
 // Placeholder user object - later we will fetch the real user from the database
 const DBuser = {
   username: "test",
   password: "pass1",
 };

 // Hash the password from the request body using bcrypt
 // Later we will compare this hash to the hash stored in the database
 // But for now, we will just do it manually
 const hashedPassword = bcrypt.hashSync(DBuser.password, 14);

 // Check if the user exists and the password matches using bcrypt
 if (DBuser && bcrypt.compareSync(password, hashedPassword)) {
   // Generate a JSON Web Token (JWT) for the user
   const token = generateToken(DBuser);
   // Send a success response with the JWT and user data
   res
     .status(200)
     .json({ message: `Welcome ${DBuser.username}!`, token, DBuser });
 } else {
   // Send an error response if the credentials are invalid
   res.status(401).json({ message: "Invalid credentials" });
 }
});   
   
   // PUT a user to update them by their id
   router.put("/:id", (req, res) => {
    const id = req.params.id;
   
    const user = req.body;
   
    console.log(id, user);
   
    res.status(200).json({ message: "I'm alive!" });
   });
   
   // DELETE a user by their id
   router.delete("/:id", (req, res) => {
    const id = req.params.id;
   
    console.log(id)
   
    res.status(200).json({ message: "I'm alive!" });
   });

   // Function to generate a JSON Web Token (JWT) for a given user
function generateToken(user) {
    // Define the payload to be included in the token, containing user data
    const payload = {
      id: user.id,
      username: user.username,
      admin: user.admin,
    };
     // Get the JWT secret from an environment variable, or use a default value
    const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
   
    // Define the options for the JWT, including the token expiration time
    const options = {
      expiresIn: "1d",
    };
   
    // Generate and return the JWT using the payload, secret, and options
    return jwt.sign(payload, secret, options);
   }   
   
   // export our router so we can initiate it in index.js
   module.exports = router;