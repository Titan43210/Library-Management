import React, { useContext, useEffect, useState } from 'react';
import "../AdminDashboard.css";
import axios from "axios";
import { AuthContext } from '../../../../Context/AuthContext';


function AddBook() {

    const API_URL = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");
    const [bookCountAvailable, setBookCountAvailable] = useState(null);
    const [language, setLanguage] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [category, setCategory] = useState("");
    const [recentAddedBooks, setRecentAddedBooks] = useState([]);

    const addBook = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const BookData = {
            bookName: bookName,
            author: author,
            bookCountAvailable: bookCountAvailable,
            language: language,
            publicationYear: publicationYear,
            category: category, 
            isAdmin: user.isAdmin
        };
        try {
            const response = await axios.post(API_URL + "api/books/addbook", BookData);
            if (recentAddedBooks.length >= 5) {
                recentAddedBooks.splice(-1);
            }
            setRecentAddedBooks([response.data, ...recentAddedBooks]);
            setBookName("");
            setAuthor("");
            setBookCountAvailable(null);
            setLanguage("");
            setPublicationYear("");
            setCategory("");
            alert("Book Added Successfully 🎉");
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "api/books/allbooks");
            setRecentAddedBooks(response.data.slice(0, 5));
        };
        getallBooks();
    }, [API_URL]);
    


    return (
        <div>
            <p className="dashboard-option-title">Add a Book</p>
            <div className="dashboard-title-line"></div>
            <form className='addbook-form' onSubmit={addBook}>

                <label className="addbook-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="bookName" value={bookName} onChange={(e) => { setBookName(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="author">Author Name<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="author" value={author} onChange={(e) => { setAuthor(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="language">Language</label><br />
                <input className="addbook-form-input" type="text" name="language" value={language} onChange={(e) => { setLanguage(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="publicationYear">Publication Year</label><br />
                <input className="addbook-form-input" type="text" name="publicationYear" value={publicationYear} onChange={(e) => { setPublicationYear(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="copies">No.of Copies Available<span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="copies" value={bookCountAvailable} onChange={(e) => { setBookCountAvailable(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="category">Category<span className="required-field">*</span></label><br />
                <input
                    className="addbook-form-input"
                    type="text"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                ></input>
                <input className="addbook-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
            </form>
            <div>
                <p className="dashboard-option-title">Recently Added Books</p>
                <div className="dashboard-title-line"></div>
                <table className='admindashboard-table'>
                    <tr>
                        <th>S.No</th>
                        <th>Book Name</th>
                        <th>Added Date</th>
                    </tr>
                    {
                        recentAddedBooks.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.createdAt.substring(0, 10)}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default AddBook