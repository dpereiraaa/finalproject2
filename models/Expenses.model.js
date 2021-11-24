const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = new Schema (
    {
        description: { type: String, required: true },
        value: { type: Number, required: true, min:0 },
        date: { type: Date, default: Date.now },
        category: {
            type: String,
            enum: ["Restaurants/bars", "Clothing", "Debts and Loans", "Education", "Entertainment and Hobbies", "Family and Children", "Food", "Gifts and Donations", "Groceries", "Health", "Home", "Investments", "Others", "Personal care", "Pets", "Shopping", "Subcriptions and Services", "Taxes", "Transportation", "Travel", "Work"]
            },
        imageUrl: String
    }
)

const Expenses = mongoose.model("Expenses", expensesSchema)

module.exports = Expenses;