import CryptoJS from "crypto-js";

const user = JSON.parse(sessionStorage.getItem("user"));
const secret = "tajnyKlic69"

let {username, password} = {username: "", password: ""}

if (user) {
  username = user.username
  const decryptedPassword = CryptoJS.AES.decrypt(user.encryptedPassword.toString(), secret).toString(CryptoJS.enc.Utf8)
  password = decryptedPassword

 }
const api_auth = btoa(
  `${username}:${password}`
);
const api_url = import.meta.env.VITE_API_URL;

export { api_auth, api_url };
