import axios from "axios";


const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true
});

function signup(email, password, passwordConfirm) {
  return service.post("/signup", {email, password, passwordConfirm}).then(response => response.data);
}

function login(email, password) {
  return service.post("/login", {email, password}).then(response => response.data);
}

function loggedIn() {
  return service.get("/loggedin").then(response => response.data);
}

function logout() {
  return service.post("logout", {}).then(response => response.data);
}


export { signup, login, loggedIn, logout };