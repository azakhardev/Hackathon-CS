import { LoginForm } from "@/components/login-form";
import { userValidate } from "@/lib/utils/validateUser";
export function LoginPage() {
  userValidate();

  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <LoginForm />
    </div>
  );
}
