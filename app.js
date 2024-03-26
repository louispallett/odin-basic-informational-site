const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Home</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About</h1>");
});

app.get("/contact-me", (req, res) => {
    res.send("<h1>Contact Me</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));