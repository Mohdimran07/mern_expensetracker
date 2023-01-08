import axios from "axios";

const API_URL = "api/goals";

const create = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}`, data, config);
  console.log("response", response.data);
  return response.data;
};

const getData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

const upDate = async(data, token) => {
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }
  console.log("data", data)

  const response = await axios.put(`${API_URL}/${data.id}`, data, config)
  console.log("resss", response.data)
   return response.data
}

const deleteItem = async(id, token) => {
  const config ={
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(`${API_URL}/${id}`, config)
  return response.data
}

const expenseService = {
  create,
  getData,
  upDate,
  deleteItem
};

export default expenseService;
