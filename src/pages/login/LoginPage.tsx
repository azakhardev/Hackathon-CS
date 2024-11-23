import { LoginForm } from "@/components/login-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";
export function LoginPage() {
  userValidate();

  return (
    <div className="flex items-center justify-center w-full h-screen px-4">
      <LoginForm />
    </div>
  );
}
