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
import { useState } from "react";
import { api_url } from "@/lib/utils/env_vars";
import { useNavigate } from "react-router-dom";
import { useUserValidate } from "@/lib/utils/validateUser";
import CryptoJS from "crypto-js";

export function LoginForm() {
  const [username, setUsername] = useState(import.meta.env.VITE_API_LOGIN);
  const [password, setPassword] = useState(import.meta.env.VITE_API_PASSWORD);
  const [error, setError] = useState<undefined | string>(undefined);
  const navigate = useNavigate();

  useUserValidate();
  const secret = "tajnyKlic69";

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch(`${api_url}/sas`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (response.ok) {
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          secret
        ).toString();
        sessionStorage.setItem(
          "user",
          JSON.stringify({ username, encryptedPassword })
        );
        navigate("/");
        window.location.reload();
      } else {
        setError("Incorrect username or password");
        setPassword("");
      }
    } catch (error) {
      setError(error.toString());
      setPassword("");
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
            <span className="-my-2 text-xs text-center text-red-400">
              {error}
            </span>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
