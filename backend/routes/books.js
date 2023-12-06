import express from "express"
import Book from "../models/Book.js"

const router = express.Router()


router.get("/allbooks", async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").sort({ _id: -1 })
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err);
    }
})


router.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions")
        res.status(200).json(book)
    }
    catch {
        return res.status(500).json(err)
    }
})


router.post("/addbook", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const newbook = await new Book({
                bookName: req.body.bookName,
                author: req.body.author,
                bookCountAvailable: req.body.bookCountAvailable,
                language: req.body.language,
                publicationYear: req.body.publicationYear,
                bookStatus: req.body.bookSatus,
                category: req.body.category
            })
            const book = await newbook.save()
            res.status(200).json(book)
        }
        catch (err) {
            res.status(504).json(err)
        }
    }
    else {
        return res.status(403).json("You dont have permission to add a book!");
    }
})


router.put("/updatebook/:id", async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Book details updated successfully");
    }
    catch (err) {
        res.status(504).json(err);
    }
})




export default router