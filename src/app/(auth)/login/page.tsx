"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-black text-white bg-[url('/assets/auth/auth.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm">
          {/* Tombol Kembali */}
          <div className="absolute top-6 left-6 z-10">
            <Link href="/">
              <button className="text-white p-4 rounded-2xl hover:bg-[#FDFB03]/10 transition-colors duration-300 cursor-pointer">
                <MdArrowBack size={24} />
              </button>
            </Link>
          </div>

          {/* Container Login */}
          <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-md bg-black border border-gray-700 shadow-xl">
              <CardHeader>
                <div className="flex justify-center mt-8 mb-8">
                  <Image
                    src="/assets/logo.png"
                    alt="Brocode Aceh Barbershop Logo"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-white mt-5">Masuk ke akun anda</CardTitle>
                <CardDescription className="font">
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
                      <div className="relative">
                        <Input
                          variant={"black"}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="Masukkan password anda"
                          className="pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FDFB03] transition-colors"
                        >
                          {showPassword ? (
                            <FaEyeSlash size={20} />
                          ) : (
                            <FaEye size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button type="submit" className="w-full" variant="yellow">
                  Login
                </Button>

                {/* Registration Link */}
                <div className="flex items-center justify-between w-full ">
                  <CardDescription>Belum memiliki akun? </CardDescription>
                  <Link href="/register">
                    <Button variant="linkYellow">Daftar Sekarang</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
