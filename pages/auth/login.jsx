import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ email, password });
  };

  return (
    <>
      <Head>
        <title>Silakan masuk dulu, biar ketahuan kamu milih siapa.</title>
      </Head>

      <Layout className="flex items-center justify-center">
        <section className="container grid gap-12">
          <div className="text-center">
            <Typography
              variant="h2"
              className="mb-3 font-extrabold capitalize text-gray-900"
            >
              Hi, Selamat datang kembali. 👏
            </Typography>
            <Typography
              variant="paragraph"
              className="font-medium text-gray-600"
            >
              Ayo masuk dulu, biar ketahuan kamu milih siapa.
            </Typography>
          </div>

          <div className="grid w-[430px] gap-8 justify-self-center">
            <form onSubmit={handleLogin} className="grid w-full gap-8">
              <div className="flex flex-col gap-3">
                <Form
                  type="email"
                  placeholder="Alamat email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form
                  type="password"
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                size="lg"
                color="pink"
                className="h-[48px] text-base capitalize"
                fullWidth
                type="submit"
              >
                Masuk
              </Button>
            </form>

            <Typography
              variant="paragraph"
              className="text-center font-medium text-gray-600"
            >
              Belum punya akun? Klik{" "}
              <Link
                href="/auth/register"
                className="font-extrabold text-pink-500 underline"
              >
                disini
              </Link>{" "}
              untuk daftar
            </Typography>
          </div>
        </section>
      </Layout>
    </>
  );
}
