import axios from "axios";


const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
})

function getWallets() {
  console.log("init")
  return service.get("/wallets", {}).then(response => response.data);
}

function updateUser(userId, email, password, passwordConfirm) {
  return service.put(`/${userId}`, {email, password, passwordConfirm}).then(response => response.data);
}

function deleteUser(userId) {
  return service.delete(`/${userId}`, {}).then(response => response.data);
}


export { getWallets, updateUser, deleteUser };