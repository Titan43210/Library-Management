import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        default: "",
    },
    publicationYear: {
        type: String,
        default: ""
    },
    bookCountAvailable: {
        type: Number,
        required: true,
    },
    bookStatus: {
        type: String,
        default: "Available",
    },
    category: { 
        type: String,
        required: true,
    }
    ,
    transactions: [{
        type: mongoose.Types.ObjectId,
        ref: "BookTransaction",
    }]
},
{
    timestamps: true,
});

export default mongoose.model("Book", BookSchema);
