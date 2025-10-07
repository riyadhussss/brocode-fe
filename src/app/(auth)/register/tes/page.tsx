import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm bg-black border border-gray-700 shadow-xl">
      <CardHeader>
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/logo.png"
            alt="Brocode Aceh Barbershop Logo"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <CardTitle className="text-white">Masuk ke akun anda</CardTitle>
        <CardDescription>
          Masukkan email dan password anda untuk masuk ke akun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                variant={"black"}
                id="email"
                type="email"
                placeholder="Masukkan email anda  "
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className="text-white" htmlFor="password">
                  Password
                </Label>
              </div>
              <Input
                variant={"black"}
                id="password"
                type="password"
                required
                placeholder="Masukkan password anda"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" variant="yellow">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
