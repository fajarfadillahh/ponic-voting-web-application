import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Typography } from "@material-tailwind/react";

// import componrnts
import Layout from "@/components/Layout";

export default function Waiting() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Harap tunggu sebentar gess.</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-40">
          <div className="container grid gap-12">
            <Image
              src="/assets/img-6.svg"
              alt="image"
              width={350}
              height={330}
              className="justify-self-center"
            />

            <div className="text-center">
              <Typography
                variant="h2"
                color="blue-gray"
                className="mb-3 font-extrabold capitalize"
              >
                Ehem, votingnya belum dimulai nih 😚
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mb-8 font-medium"
              >
                Voting ini akan di mulai{" "}
                <span className="font-extrabold text-pink-500">
                  Rabu 06/09/2023 10:00
                </span>
                . Jadi dipersilakan untuk <br /> beli cemilan dan minuman untuk
                menemani kamu disini.
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
