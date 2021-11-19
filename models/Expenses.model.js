const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema (
    {
        description: { type: String, required: true },
        value: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        category: {
            type: String,
            enum: ["clothes", "entertainment", "travel", "gifts", "pets", "investments", "education", "debts", "health", "purchases", "house", "bars", "restaurants", "subscriptions", "food", "transport", "other"]
            }    
    }
)

const Expenses = mongoose.model("Expenses", expensesSchema)

module.exports = Expenses;