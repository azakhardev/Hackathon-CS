import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { api_url } from "./env_vars"
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

export function useUserValidate() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const validateUser = async () => {
          const userData = sessionStorage.getItem("user");
    
          if (!userData) {
            if (location.pathname != "/login") {
                navigate("/login");
            }
            return;
          }
    
          const { username, encryptedPassword } = JSON.parse(userData);
          const secret = "tajnyKlic69"
          const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword.toString(), secret).toString(CryptoJS.enc.Utf8)
    
          try {
            const response = await fetch(`${api_url}/sas`, {
              method: "GET",
              headers: {
                Authorization: `Basic ${btoa(`${username}:${decryptedPassword}`)}`,
              },
            });
    
            if (!response.ok) {
                if (location.pathname != "/login") {
                    navigate("/login");
                }
                
            } else {
                if (location.pathname == "/login") {
                    navigate("/");
                }
            }
          } catch {
            if (location.pathname != "/login") {
                navigate("/login");
            }
          }
        };
    
        validateUser();
      }, [navigate, location.pathname]);

      
      return;
}