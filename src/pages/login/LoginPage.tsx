import { LoginForm } from "@/components/login-form";
import { useUserValidate } from "@/lib/utils/validateUser";
export function LoginPage() {
  useUserValidate();

  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <LoginForm />
    </div>
  );
}
