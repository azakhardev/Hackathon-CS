import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";
import { api_url } from "./env_vars"
import { useLocation } from "react-router-dom";

export function userValidate() {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const validateUser = async () => {
          const userData = localStorage.getItem("user");
    
          if (!userData) {
            if (location.pathname != "/login") {
                navigate("/login");
            }
            return;
          }
    
          const { username, password } = JSON.parse(userData);
    
          try {
            const response = await fetch(`${api_url}/sas`, {
              method: "GET",
              headers: {
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
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
          } catch (error) {
            if (location.pathname != "/login") {
                navigate("/login");
            }
          }
        };
    
        validateUser();
      }, [navigate]);

      
      return;
}