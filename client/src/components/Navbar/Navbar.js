import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <>
      
      <nav class="navbar navbar-white bg-dark">
        <div class="container p-2">
          <a href="/" class="navbar-brand text-white">
            <strong>Expense Tracker</strong>
          </a>
          <div class="d-flex justify-content-around ">
            <Link to='/addExpense'><button type="button" class="btn btn-outline-primary" style={{ marginRight:"16px"}}>Add Expense</button></Link>
            <button className="btn btn-sm btn-outline-primary p-2 ml-2" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
