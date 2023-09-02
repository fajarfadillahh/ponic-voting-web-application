import Head from "next/head";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import { useRouter } from "next/router";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";

export default function Home() {
  const router = useRouter();

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
          <div className="container grid grid-cols-2 items-center gap-8">
            <div>
              <Typography
                variant="h1"
                className="mb-2 max-w-[520px] font-extrabold capitalize text-gray-900"
              >
                Tentukan pilihan kamu dari sekarang. 🚀
              </Typography>
              <Typography
                variant="paragraph"
                className="mb-8 max-w-[490px] font-medium leading-[175%] text-gray-600"
              >
                Ponic adalah platform voting berbasis web yang inovatif dan
                user-friendly yang dirancang untuk memenuhi segala jenis
                kebutuhan pemungutan suara anda.
              </Typography>
              <div className="inline-flex items-center gap-3">
                <Button
                  size="lg"
                  color="pink"
                  className="h-[48px] w-[160px] text-base font-bold capitalize"
                >
                  Buat voting
                </Button>
                <Button
                  size="lg"
                  variant="text"
                  color="pink"
                  className="inline-flex h-[48px] items-center gap-1 text-base font-bold capitalize"
                  onClick={() => router.push("/dashboard")}
                >
                  Halaman dashboard
                  <HiArrowRight />
                </Button>
              </div>
            </div>

            <Image
              src="/assets/img-1.svg"
              alt="hero img"
              width={580}
              height={475}
            />
          </div>
        </section>
      </Layout>
    </>
  );
}
