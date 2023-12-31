// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import LoadingButton from "@/components/Loading/LoadingButton";
import { Button, Typography } from "@material-tailwind/react";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// import utils
import fetcher from "@/utils/fetcher";
import toast from "@/utils/toast";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [icon, setIcon] = useState(<HiOutlineEyeOff />);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    if (typePassword === "password") {
      setIcon(<HiOutlineEye />);
      setTypePassword("text");
    } else {
      setIcon(<HiOutlineEyeOff />);
      setTypePassword("password");
    }
  };

  async function handleRegister() {
    try {
      setIsLoading(true);
      const { data } = await fetcher(
        "/users/register",
        "POST",
        {
          email,
          fullname,
          password,
        },
        null,
      );

      if (data.success) {
        Cookies.set("token", data.data.token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        });
        return (window.location.href = "/dashboard");
      }
    } catch (error) {
      setIsLoading(false);

      const response = error.response;

      response.data.errors.map((error) => {
        toast(error.message, "error");
      });
    }
  }

  return (
    <>
      <Head>
        <title>
          Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
        </title>
      </Head>

      <Layout className="2xl:grid 2xl:grid-cols-2 2xl:items-center 2xl:justify-center">
        <div className="hidden 2xl:relative 2xl:block 2xl:h-screen 2xl:bg-pink-500">
          <Image
            src="/assets/img-aceent.svg"
            alt="accent image"
            className="absolute left-0 top-0 h-full w-full object-cover object-center"
            fill={true}
            priority={true}
          />
        </div>

        <div className="flex h-screen items-center justify-center">
          <div className="container grid gap-12">
            <div className="text-center">
              <Typography
                variant="h2"
                color="blue-gray"
                className="mb-3 font-extrabold capitalize dark:text-white"
              >
                Selamat datang di Ponic. 🤩
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="font-medium dark:text-white"
              >
                Silakan buat akun, sebelum kamu mulai voting.
              </Typography>
            </div>

            <div className="mx-auto grid w-full max-w-[380px] gap-8">
              <form className="grid w-full gap-8">
                <div className="flex flex-col gap-3">
                  <Form
                    type="email"
                    placeholder="Alamat email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form
                    type="text"
                    placeholder="Nama lengkap"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  <div className="relative flex w-full items-center">
                    <Form
                      type={typePassword}
                      placeholder="Kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="absolute right-6 cursor-pointer rounded-lg p-1 text-[1.3rem] text-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800"
                      onClick={handleShowPassword}
                    >
                      {icon}
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <LoadingButton className="h-[52px] w-full" />
                ) : (
                  <Button
                    size="lg"
                    color="pink"
                    className="text-base capitalize"
                    fullWidth
                    onClick={handleRegister}
                  >
                    Buat akun
                  </Button>
                )}
              </form>

              <Typography
                variant="paragraph"
                color="gray"
                className="text-center font-medium dark:text-white"
              >
                Sudah punya akun? Klik{" "}
                <Link
                  href="/auth/login"
                  className="font-extrabold text-pink-500 underline"
                >
                  disini
                </Link>{" "}
                untuk masuk
              </Typography>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
