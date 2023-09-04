import Head from "next/head";
import { useRouter } from "next/router";
import { HiOutlineArrowLeft } from "react-icons/hi";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";
import CountDown from "@/components/Countdown/CountDown";
import CandidateItem from "@/components/Candidate/CandidateItem";

export default function Voting() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ayo, Tentukan pilihan kamu sekarang!</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-40">
          <div className="container grid gap-12">
            <div className="grid gap-6 justify-self-center text-center">
              <Typography
                variant="h1"
                color="blue-gray"
                className="mx-auto max-w-[920px] font-extrabold capitalize"
              >
                Pemilihan Ketua Karang Taruna
              </Typography>

              {/* countdown components */}
              <CountDown />
            </div>

            <div className="grid w-full max-w-[850px] gap-6 justify-self-center">
              <CandidateItem />
              <CandidateItem />
              <CandidateItem />
            </div>

            <div className="grid gap-4 justify-self-center">
              <Button size="lg" color="pink" className="text-base capitalize">
                Kirim voting 🚀
              </Button>
              <Button
                size="lg"
                color="pink"
                variant="text"
                className="inline-flex items-center gap-1 text-base capitalize"
                onClick={() => router.push("/dashboard")}
              >
                <HiOutlineArrowLeft />
                Kembali ke dashboard
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
