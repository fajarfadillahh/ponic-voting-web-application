// import components
import Layout from "@/components/Layout";
import { Button, Typography } from "@material-tailwind/react";
import Head from "next/head";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";

// import utils
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>
          Selamat datang di Ponic. - Aplikasi voting berbasis web terbaik di
          Indonesia.
        </title>
      </Head>

      <Layout>
        {/* ==== hero section ==== */}
        <section className="pb-16 pt-40">
          <div className="container grid gap-8 xl:grid-cols-2 xl:items-center">
            <div className="justify-self-center text-center xl:justify-self-start xl:text-left">
              <Typography
                color="blue-gray"
                className="mb-2 max-w-[520px] text-[32px] font-extrabold capitalize dark:text-white sm:text-[48px]"
              >
                Tentukan pilihan kamu dari sekarang. 🚀
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mb-8 max-w-[490px] font-medium dark:text-white"
              >
                Ponic adalah platform voting berbasis web yang inovatif dan
                user-friendly yang dirancang untuk memenuhi segala jenis
                kebutuhan pemungutan suara anda.
              </Typography>
              <div className="flex flex-col items-center gap-3 xl:flex-row">
                <Button
                  size="lg"
                  color="pink"
                  className="w-full text-base capitalize sm:w-[225px] xl:w-[160px]"
                  onClick={() => router.push("/dashboard/create")}
                >
                  Buat voting
                </Button>
                <Button
                  size="lg"
                  variant="text"
                  color="pink"
                  className="inline-flex w-full items-center justify-center gap-1 text-base capitalize sm:w-[225px]"
                  onClick={() => router.push("/dashboard")}
                >
                  Halaman dashboard
                  <HiArrowRight />
                </Button>
              </div>
            </div>

            <Image
              src={`/assets/img-${theme == "dark" ? "1-white" : "1"}.svg`}
              alt="hero img"
              width={580}
              height={475}
              className="justify-self-center"
              priority={true}
            />
          </div>
        </section>
      </Layout>
    </>
  );
}
