import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <Image
          src="/assets/logo.png" // Ganti dengan path logomu
          alt="Logo Brocode"
          width={200} // Bisa kamu ubah sesuai ukuran
          height={40}
          className="object-contain mb-5"
        />
        <h1 className="text-2xl font-bold">Masuk ke akun anda</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Masukkan email/nomor HP dan password anda untuk masuk ke akun
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email/No HP</Label>
          <Input
            variant={"black"}
            id="email"
            type="email"
            placeholder="Masukkan email/no hp anda"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input
            variant={"black"}
            id="password"
            type="password"
            placeholder="Masukkan password anda"
            required
          />
        </div>
        <Button variant={"yellow"} type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Belum memiliki akun?{" "}
        <a href="#" className="underline underline-offset-4">
          Daftar Sekarang!
        </a>
      </div>
    </form>
  );
}
