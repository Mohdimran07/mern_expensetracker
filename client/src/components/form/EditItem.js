import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateExpenseData } from '../features/expenserTracker/expenseSlice';


const EditItem = ({ setOpen, data }) => {
    console.log("data", data)
    console.log("setOpen", setOpen)
    const id = data._id

    useEffect(() => {
        setAmount(data.amount)
        setTitle(data.title)
        setCategory(data.category)
    }, [])

    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [amount, setAmount] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        if(!title || !amount || !category){
            toast.error("please fill all the feilds")
        }
        console.log("data", { title, amount, category})
        dispatch(updateExpenseData({ id, title, amount, category }))
        toast.success("Data updated successfully!!");
        setOpen(false)
    }
    return (
            // <button onClick={() => setOpen(false)}>Go back</button>
            <div className="container mt-5">
            <Link to='/'>
         <Button variant="dark" type="button" onClick={() => setOpen(false)} className="mb-2">
                    go back
                  </Button></Link>
          
          <div className="card mx-auto ">
            <div className="card-body">
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="category"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="amount"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="dark" type="submit">
                    Update
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          </div>
    )
}

export default EditItem
