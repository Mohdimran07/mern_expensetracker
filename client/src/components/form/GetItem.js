import { Button } from 'bootstrap'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteExpenseItem } from '../features/expenserTracker/expenseSlice'
import EditItem from './EditItem'

const GetItem = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(open)

  const EditData = (obj) => {
    console.log("obj", obj)
    setEditData(obj)
    setOpen(true)
  }

  const deleteItem = (id) => {
    console.log("id", id)
    dispatch(deleteExpenseItem(id))
  }

  return (
    <>
      {!open ? (<div className='container-fluid'>
        <div className='row d-flex flex-column rounded'>
          <div className='col-md-12 mx-auto my-4 '>
            <table className="table table-hover rounded">
              <thead className="table-header table-danger text-white">
                <tr>
                  <th scope="col">S.no</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, id) => (
                  <tr className="table-info " key={id}>
                    <td>{id + 1}</td>
                    <td>{data.title}</td>
                    <td>{data.category}</td>
                    <td>{data.amount}</td>
                    <td>
                      <button className="btn btn-sm btn-primary mr-1" onClick={() => EditData(data)}>EDIT</button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteItem(data._id)}>DELETE</button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>
      </div>) : (
        <>
          <EditItem setOpen={setOpen} data={editData} />
        </>
      )}

    </>
  )
}

export default GetItem
