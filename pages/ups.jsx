// import components
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

// import utils
import toast from "@/utils/toast";
import messages from "@/utils/messages";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function SomethingWrong() {
  const { theme } = useTheme();
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
              src={`/assets/img-${theme == "dark" ? "3-white" : "3"}.svg`}
              alt="hero img"
              width={350}
              height={395}
              className="justify-self-center"
              priority={true}
            />

            <div className="text-center">
              <Typography
                color="blue-gray"
                className="mb-3 text-[32px] font-extrabold capitalize dark:text-white sm:text-[42px]"
              >
                Hmm, ada yang salah deh 🤔
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mx-auto mb-8 max-w-[460px] font-medium dark:text-white"
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
