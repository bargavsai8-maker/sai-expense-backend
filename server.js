const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("SAI Expense Tracker Backend is running!");
});

app.post("/api/transactions", (req, res) => {
  const transaction = req.body;

  console.log("New transaction:", transaction);

  res.json({
    success: true,
    message: "Transaction received!",
    transaction: transaction
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
