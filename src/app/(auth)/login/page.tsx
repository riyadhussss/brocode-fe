import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/auth/login/login-form";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-neutral-950">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="absolute top-6 left-6">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm className="text-white" />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block overflow-hidden">
        <Image
          src="/assets/auth/auth.png"
          alt="Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
    </div>
  );
}
