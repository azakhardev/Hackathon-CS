const user = JSON.parse(localStorage.getItem("user"));

let {username, password} = {username: "", password: ""}

if (user) {
  username = user.username
  password = user.password
 }
const api_auth = btoa(
  `${username}:${password}`
);
const api_url = import.meta.env.VITE_API_URL;

export { api_auth, api_url };
