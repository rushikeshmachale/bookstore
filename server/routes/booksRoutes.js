import express from "express";
import { addBook, addBooks, getAllBooks, getBookByID ,deleteBookByid} from "../controllers/booksController.js";

const bookrouter = express.Router()

// authentication
bookrouter.post('/save',addBook)
bookrouter.post('/save/books',addBooks)
bookrouter.get('/find',getAllBooks)
bookrouter.get('/get/:id',getBookByID)
bookrouter.delete('/delete/:id',deleteBookByid)

export default bookrouter