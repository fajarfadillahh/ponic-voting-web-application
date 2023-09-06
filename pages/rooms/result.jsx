import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";

export default function Result() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Yeay.. Pemenangnya udah diumumin nichh.</title>
      </Head>

      <Layout className="relative flex items-center justify-center">
        <div className="absolute -left-[160px] -top-[160px] h-[320px] w-[320px] rounded-full bg-pink-500 blur-[120px]" />
        <div className="absolute -bottom-[160px] -right-[160px] h-[320px] w-[320px] rounded-full bg-yellow-500 blur-[90px]" />

        <section className="container grid gap-24">
          <div className="inline-flex items-center gap-2 justify-self-center">
            <Image src="/assets/icon.svg" alt="icon" width={48} height={48} />
            <Typography
              color="blue-gray"
              className="text-[32px] font-extrabold"
            >
              Ponic<span className="text-pink-500">.</span>
            </Typography>
          </div>

          <div className="grid justify-items-center gap-16 justify-self-center">
            <div className="text-center">
              <Typography
                variant="paragraph"
                color="gray"
                className="mb-2 font-medium"
              >
                Pemenang pada voting ini adalah:
              </Typography>
              <Typography
                color="blue-gray"
                className="min-w-[645px] border-b-4 border-pink-500 text-[56px] font-extrabold capitalize"
              >
                "Fajar Fadillah Agustian"
              </Typography>
            </div>

            <div className="text-center">
              <Typography
                variant="paragraph"
                color="gray"
                className="mb-2 font-medium"
              >
                Terima kasih, telah berpartisipasi pada voting yang berjudul
                dibawah ini, <br /> dan dilaksanakan pada{" "}
                <span className="font-extrabold text-pink-500">
                  Rabu 06/09/2023 10:00
                </span>
              </Typography>
              <Typography
                color="blue-gray"
                className="max-w-[580px] text-[28px] font-extrabold capitalize"
              >
                “Pemilihan Ketua Himpunan Mahasiswa Universitas Indonesia”
              </Typography>
            </div>

            <Button
              size="lg"
              color="pink"
              className="min-w-[241px] text-base capitalize"
              onClick={() => router.push("/dashboard")}
            >
              Kembali ke dashboard
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
}
