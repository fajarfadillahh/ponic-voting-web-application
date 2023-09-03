import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log({ email, fullname, password });
  };

  return (
    <>
      <Head>
        <title>
          Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
        </title>
      </Head>

      <Layout className="flex items-center justify-center">
        <section className="container grid gap-12">
          <div className="text-center">
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-3 font-extrabold capitalize"
            >
              Selamat datang di Ponic. 🤩
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className="font-medium"
            >
              Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
            </Typography>
          </div>

          <div className="grid w-[430px] gap-8 justify-self-center">
            <form onSubmit={handleRegister} className="grid w-full gap-8">
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
                className="text-base capitalize"
                fullWidth
                type="submit"
              >
                Buat akun
              </Button>
            </form>

            <Typography
              variant="paragraph"
              color="gray"
              className="text-center font-medium"
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
        </section>
      </Layout>
    </>
  );
}
