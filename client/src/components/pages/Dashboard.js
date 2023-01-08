import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/auth/authSlice";

import { getExpenseData, reset } from "../features/expenserTracker/expenseSlice";
import AddItems from "../form/AddItems";
import GetItem from "../form/GetItem";
import BorderExample from "../loader/BorderExample";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { data, isLoading, isError, isSuccess, message } = useSelector((state) => state.expense)
  console.log("data", data)


  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, isError, message])

  useEffect(() => {
    console.log("started running")
    if (data) {
      dispatch(getExpenseData())
    }
  }, [dispatch])

  if (isLoading) {
    return <BorderExample />
  }

  return (
    <>
      <Navbar />
      <div class="container d-flex justify-content-center">
        <div class="col-md-12">
          <section className='content'>
            {data.length > 0 ? (
              <div className=''>
                {data && <GetItem data={data} />}
              </div>
            ) : (
              <h3>You have no data to show</h3>
            )}
          </section>
          <div>
          </div>
        </div>
      </div>
      {/* <Route path='/addExpense' element={<AddItems />} /> */}
    </>
  );
};

export default Dashboard;
