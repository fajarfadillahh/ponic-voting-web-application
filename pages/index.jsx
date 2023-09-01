import Head from "next/head";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";

// import material-components
import { Button } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";

export default function Home() {
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
              <h1 className="section-title max-w-[520px] text-[48px]">
                Tentukan pilihan kamu dari sekarang. 🚀
              </h1>
              <p className="section-text max-w-[490px] pb-8">
                Ponic adalah platform voting berbasis web yang inovatif dan
                user-friendly yang dirancang untuk memenuhi segala jenis
                kebutuhan pemungutan suara anda.
              </p>
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
                  className="inline-flex h-[48px] items-center gap-1 text-base font-bold capitalize text-pink-500"
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
