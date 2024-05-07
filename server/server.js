const express = require("express");
const bodyParser = require("body-parser");
const mariadb = require("mariadb");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

// Create MariaDB connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

// Signup route
app.post("/auth/signup", async (req, res) => {
  const { firstName, lastName, emailAddress, password, county } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // If user doesn't exist, proceed with user registration
  try {
    conn = await pool.getConnection();
    const query =
      "INSERT INTO UserSignUp (first_name, last_name, email, password, county) VALUES (?, ?, ?, ?, ?)";
    const result = await conn.query(query, [
      firstName,
      lastName,
      emailAddress,
      hashedPassword, // Use the hashed password here
      county,
    ]);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } finally {
    if (conn) conn.release();
  }
});

// Start the server
const PORT = process.env.PORT || 9764;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});