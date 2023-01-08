import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createExpense } from "../features/expenserTracker/expenseSlice";
import Navbar from "../Navbar/Navbar";

const AddItems = () => {
  console.log("render...")
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, isLoading, isSuccess, isError, message } = useSelector((state) => state.expense)


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title)


   
      dispatch(createExpense({ title, amount, category }))
      navigate('/')
      toast.success("Item added", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    

  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <Link to='/'>
          <Button variant="dark" type="button" className="mb-2">
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
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItems;
