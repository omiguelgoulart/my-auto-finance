import { LoginForm } from "@/components/(auth)/login/LoginForm";
import { LoginHeader } from "@/components/(auth)/login/LoginHeader";


export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  )
}
