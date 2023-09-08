import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Oups.. halaman yang kamu cari tidak ditemuka.</title>
      </Head>

      <Layout>
        {/* ==== hero section ==== */}
        <section className="pb-16 pt-40">
          <div className="container grid gap-12">
            <Image
              src="/assets/img-2.svg"
              alt="hero img"
              width={500}
              height={300}
              className="justify-self-center"
            />

            <div className="text-center">
              <Typography
                color="blue-gray"
                className="mb-3 text-[32px] font-extrabold capitalize sm:text-[42px]"
              >
                Opsss, Halaman gak ketemu 😲
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mx-auto mb-8 max-w-[420px] font-medium"
              >
                Halaman yang kamu cari gak ketemu nih. Pastiin URL yang kamu
                masukin udah bener yahh.
              </Typography>
              <Button
                size="lg"
                color="pink"
                className="text-base capitalize"
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
