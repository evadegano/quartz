import axios from "axios";


const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
});


function requestReset(email) {
  return service.post("/request", { email }).then(response => response.data);
}

function resetPwd(userId, password, passwordConfirm) {
  return service.post(`/reset-password/${userId}`, { password, passwordConfirm }).then(response => response.data);
}


export { requestReset, resetPwd };