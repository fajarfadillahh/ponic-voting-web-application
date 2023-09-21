// import components
import Layout from "@/components/Layout";
import { Button, Typography } from "@material-tailwind/react";
import Head from "next/head";
import Image from "next/image";

// import utils
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function NotFound() {
  const router = useRouter();
  const { theme } = useTheme();

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
              src={`/assets/img-${theme == "dark" ? "2-white" : "2"}.svg`}
              alt="hero img"
              width={500}
              height={300}
              className="justify-self-center"
              priority={true}
            />

            <div className="text-center">
              <Typography
                color="blue-gray"
                className="mb-3 text-[32px] font-extrabold capitalize dark:text-white sm:text-[42px]"
              >
                Opsss, Halaman gak ketemu 😲
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mx-auto mb-8 max-w-[420px] font-medium dark:text-white"
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
