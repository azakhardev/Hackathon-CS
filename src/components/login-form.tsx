import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginContext from "@/App";
import { ILogin } from "@/lib/types/ILogin";
import { useContext, useEffect, useState } from "react";
import { api_url } from "@/lib/utils/env_vars";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  //const login = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem("login");
    if (storedLogin) {
      const { username, password } = JSON.parse(storedLogin);
      setUsername(username);
      setPassword(password);
      navigate("/");
    } else {
      setUsername(import.meta.env.VITE_API_LOGIN);
      setPassword(import.meta.env.VITE_API_PASSWORD);
    }
  }, [navigate]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch(`${api_url}/sas`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${username}:${password}`,
        },
      });

      if (response.ok) {
        localStorage.setItem("login", JSON.stringify({ username, password }));
        //TODO: set login context
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  }

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to enter in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
