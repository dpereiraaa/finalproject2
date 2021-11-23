const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receivedSchema = new Schema ({ 

    description: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { 
        type: String, 
        enum: ["Investments", "Loans", "Salary", "Other earnings"] 
    }

})

const Received = mongoose.model("Received", receivedSchema)

module.exports = Received;