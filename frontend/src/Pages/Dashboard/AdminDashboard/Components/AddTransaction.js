import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"

function AddTransaction() {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const [borrowerId, setBorrowerId] = useState("")
    const [borrowerDetails, setBorrowerDetails] = useState([])
    const [bookId, setBookId] = useState("")
    const [recentTransactions, setRecentTransactions] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [allBooks, setAllBooks] = useState([])

    const [fromDate, setFromDate] = useState(null)
    const [fromDateString, setFromDateString] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [toDateString, setToDateString] = useState(null)

    const transactionTypes = [
        { value: 'Issued', text: 'Issue' }
    ]

    const [transactionType, setTransactionType] = useState("")

    const addTransaction = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (bookId !== "" && borrowerId !== "" && transactionType !== "" && fromDate !== null && toDate !== null) {
            const borrower_details = await axios.get(API_URL + "api/users/getuser/" + borrowerId)
            const book_details = await axios.get(API_URL + "api/books/getbook/" + bookId)
            
            if (book_details.data.bookCountAvailable > 0 && transactionType === "Issued") {
                const transactionData = {
                    bookId: bookId,
                    borrowerId: borrowerId,
                    borrowerName: borrower_details.data.userFullName,
                    bookName: book_details.data.bookName,
                    transactionType: transactionType,
                    fromDate: fromDateString,
                    toDate: toDateString,
                    isAdmin: user.isAdmin
                }
                try {
                    const response = await axios.post(API_URL + "api/transactions/add-transaction", transactionData)
                    if (recentTransactions.length >= 5) {
                        (recentTransactions.splice(-1))
                    }
                    await axios.put(API_URL + `api/users/${response.data._id}/move-to-activetransactions`, {
                        userId: borrowerId,
                        isAdmin: user.isAdmin
                    })

                    await axios.put(API_URL+"api/books/updatebook/"+bookId,{
                        isAdmin:user.isAdmin,
                        bookCountAvailable:book_details.data.bookCountAvailable - 1
                    })

                    setRecentTransactions([response.data, ...recentTransactions])
                    setBorrowerId("")
                    setBookId("")
                    setTransactionType("")
                    setFromDate(null)
                    setToDate(null)
                    setFromDateString(null)
                    setToDateString(null)
                    alert("Transaction was Successfull 🎉")
                }
                catch (err) {
                    console.log(err)
                }
            }
            else{
                alert("The book is not available")
            }
        }
        else {
            alert("Fields must not be empty")
        }
        setIsLoading(false)
    }


    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axios.get(API_URL + "api/transactions/all-transactions")
                setRecentTransactions(response.data.slice(0, 5))
            }
            catch (err) {
                console.log("Error in fetching transactions")
            }

        }
        getTransactions()
    }, [API_URL])

    useEffect(() => {
        const getBorrowerDetails = async () => {
            try {
                if (borrowerId !== "") {
                    const response = await axios.get(API_URL + "api/users/getuser/" + borrowerId)
                    setBorrowerDetails(response.data)
                }
            }
            catch (err) {
                console.log("Error in getting borrower details")
            }
        }
        getBorrowerDetails()
    }, [API_URL, borrowerId])


    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                const all_members = await response.data.map(member => (
                    { value: `${member?._id}`, text: `${member?.userType === "Student" ? `${member?.userFullName}[${member?.admissionId}]` : `${member?.userFullName}[${member?.employeeId}]`}` }
                ))
             
                if(JSON.parse(localStorage.getItem("user")).isAdmin){
                    setAllMembers(all_members)
                }else{
                    setAllMembers(all_members.filter((member) => {
                        return member.value === JSON.parse(localStorage.getItem("user"))._id
                    }))
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])


    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "api/books/allbooks")
            const allbooks = await response.data.map(book => (
                { value: `${book._id}`, text: `${book.bookName}` }
            ))
            setAllBooks(allbooks)
        }
        getallBooks()
    }, [API_URL, allBooks])


    return (
        <div>
            <p className="dashboard-option-title">Issue a book</p>
            <div className="dashboard-title-line"></div>
            <form className='transaction-form' onSubmit={addTransaction}>
                <label className="transaction-form-label" htmlFor="borrowerId">Borrower<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select Member'
                        fluid
                        search
                        selection
                        value={borrowerId}
                        options={allMembers}
                        onChange={(event, data) => setBorrowerId(data.value)}
                    />
                </div>
                <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Name</th>
                        <th>Issued</th>
                    </tr>
                    <tr>
                        <td>{borrowerDetails.userFullName}</td>
                        <td>{borrowerDetails.activeTransactions?.filter((data) => {
                            return data.transactionType === "Issued" && data.transactionStatus === "Active"
                        }).length
                        }
                        </td>
                    </tr>
                </table>
                <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Book-Name</th>
                        <th>Transaction</th>
                        <th>From Date<br /><span style={{ fontSize: "10px" }}>[MM/DD/YYYY]</span></th>
                        <th>To Date<br /><span style={{ fontSize: "10px" }}>[MM/DD/YYYY]</span></th>
                    </tr>
                    {
                        borrowerDetails.activeTransactions?.filter((data) => { return data.transactionStatus === "Active" }).map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.bookName}</td>
                                    <td>{data.transactionType}</td>
                                    <td>{data.fromDate}</td>
                                    <td>{data.toDate}</td>
                                </tr>
                            )
                        })
                    }
                </table>

                <label className="transaction-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select a Book'
                        fluid
                        search
                        selection
                        options={allBooks}
                        value={bookId}
                        onChange={(event, data) => setBookId(data.value)}
                    />
                </div>

                <label className="transaction-form-label" htmlFor="transactionType">Transaction Type<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Select Transaction'
                        fluid
                        selection
                        value={transactionType}
                        options={transactionTypes}
                        onChange={(event, data) => setTransactionType(data.value)}
                    />
                </div>
                <br />

                <label className="transaction-form-label" htmlFor="from-date">From Date<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={fromDate}
                    onChange={(date) => { setFromDate(date); setFromDateString(moment(date).format("MM/DD/YYYY")) }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />
                <br/>
                <label className="transaction-form-label" htmlFor="to-date">To Date<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={toDate}
                    onChange={(date) => { setToDate(date); setToDateString(moment(date).format("MM/DD/YYYY")) }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />

                <input className="transaction-form-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
            </form>
            <p className="dashboard-option-title">Recent Transactions</p>
            <div className="dashboard-title-line"></div>
            <table className="admindashboard-table">
                <tr>
                    <th>S.No</th>
                    <th>Book Name</th>
                    <th>Borrower Name</th>
                    <th>Date</th>
                </tr>
                {
                    recentTransactions.map((transaction, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.bookName}</td>
                                <td>{transaction.borrowerName}</td>
                                <td>{transaction.updatedAt.slice(0, 10)}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AddTransaction