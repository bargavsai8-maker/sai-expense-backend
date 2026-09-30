const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

let transactions;

async function startServer() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();

  const db = client.db("sai_expense_tracker");
  transactions = db.collection("transactions");

  console.log("Connected to MongoDB!");

  app.get("/", (req, res) => {
    res.send("SAI Expense Tracker Backend is running!");
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const transaction = req.body;

      const result = await transactions.insertOne({
        ...transaction,
        createdAt: new Date()
      });

      res.status(201).json({
        success: true,
        message: "Transaction saved!",
        id: result.insertedId
      });
    } catch (error) {
      console.error("Save error:", error);
      res.status(500).json({
        success: false,
        message: "Could not save transaction"
      });
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
   console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
