import { LoginForm } from "@/components/form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <LoginForm />
      <Link
        href={"/auth/signup"}
        className="ml-auto text-center text-sm hover:text-theme underline underline-offset-3"
      >
        계정이 없으신가요?
      </Link>
    </div>
  );
}
