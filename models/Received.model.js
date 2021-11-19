const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receivedSchema = new Schema ({ 

    description: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: { 
        type: String, 
        enum: ["salary", "loans", "wage", "others"] 
    }

})

const Received = mongoose.model("Received", receivedSchema)

module.exports = Received;