const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST endpoint to save reservations
app.post("/reserve", (req, res) => {
  const reservation = req.body;
  const filePath = path.join(__dirname, "reservations.json");

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  data.push(reservation);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.send({ message: "Reservation successful!" });
});
app.post("/contact", (req, res) => {
  const contact = req.body;
  const filePath = path.join(__dirname, "contacts.json");

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  // add a timestamp or id
  contact.id = Date.now();

  data.push(contact);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.send({ message: "Your message has been received!" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
