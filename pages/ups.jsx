import Head from "next/head";
import Image from "next/image";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";

export default function SomethingWrong() {
  return (
    <>
      <Head>
        <title>Sepertinya telah terjadi kesalahan!</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-40">
          <div className="container grid gap-12">
            <Image
              src="/assets/img-3.svg"
              alt="hero img"
              width={350}
              height={395}
              className="justify-self-center"
            />

            <div className="text-center">
              <Typography
                variant="h1"
                className="mb-3 font-extrabold capitalize text-gray-900"
              >
                Hmm, ada yang salah deh 🤔
              </Typography>
              <Typography
                variant="paragraph"
                className="mb-8 font-medium text-gray-600"
              >
                Sepertinya terjadi kesalahan, silakan refresh/muat ulang halaman
                ini
                <br />
                atau kembali ke halaman utama.
              </Typography>
              <Button
                size="lg"
                color="pink"
                className="h-[48px] text-base capitalize"
                onClick={() => router.push("/dashboard")}
              >
                Kembali ke dashboard
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
