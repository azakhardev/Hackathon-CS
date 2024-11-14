
const login = btoa(`${import.meta.env.VITE_API_LOGIN}:${import.meta.env.VITE_API_PASSWORD}`)
console.log(login);
export default login