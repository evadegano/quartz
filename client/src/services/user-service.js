import axios from "axios";


const service = axios.create({
  baseURL: `${process.env.API_URL}`,
  withCredentials: true
})

function updateUser(userId, email, password, passwordConfirm) {
  return service.put(`/${userId}`, {email, password, passwordConfirm}).then(response => response.data);
}

function deleteUser(userId) {
  return service.delete(`/${userId}`, {}).then(response => response.data);
}


export { updateUser, deleteUser };