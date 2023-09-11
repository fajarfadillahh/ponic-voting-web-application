import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";

// import utils
import toast from "@/utils/toast";
import messages from "@/utils/messages";
import { useEffect } from "react";

export default function SomethingWrong() {
  const router = useRouter();

  const { code } = router.query;

  useEffect(() => {
    if (code) {
      toast(messages[code], "error");
    }
  }, [code]);

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
                color="blue-gray"
                className="mb-3 text-[32px] font-extrabold capitalize sm:text-[42px]"
              >
                Hmm, ada yang salah deh 🤔
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mx-auto mb-8 max-w-[460px] font-medium"
              >
                Sepertinya terjadi kesalahan, silakan refresh/muat ulang halaman
                ini atau kembali ke halaman utama.
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
