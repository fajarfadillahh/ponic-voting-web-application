import Head from "next/head";
import Image from "next/image";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useTheme } from "next-themes";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import toast from "@/utils/toast";
import messages from "@/utils/messages";

export default function Participant() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (router.query.code) {
      console.log("ok");
      toast(messages[router.query.code], "error");
      router.replace("/rooms");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Ayo Ikutan Voting!</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-40">
          <div className="container grid gap-12">
            <Image
              src={`/assets/img-${theme == "dark" ? "5-white" : "5"}.svg`}
              width={400}
              height={330}
              alt="img"
              className="block justify-self-center"
            />

            <div className="grid gap-8">
              <div className="text-center">
                <Typography
                  color="blue-gray"
                  className="mb-2 text-[32px] font-extrabold capitalize dark:text-white sm:text-[48px]"
                >
                  Ayo, ikutan voting 🚀
                </Typography>
                <Typography
                  variant="paragraph"
                  color="gray"
                  className="font-medium dark:text-white"
                >
                  Masukan kode voting yang telah diberikan oleh
                  panitia/penyelenggara.
                </Typography>
              </div>

              <div className="grid w-full gap-6 justify-self-center sm:w-[420px]">
                <div className="grid gap-4">
                  <Form
                    type="text"
                    placeholder="Masukan Kode Voting"
                    className="text-center uppercase placeholder:capitalize"
                    value={code}
                    onChange={(e) => setCode(e.target.value.substring(0, 8))}
                  />

                  <Button
                    size="lg"
                    color="pink"
                    className="text-base capitalize"
                    onClick={() => router.push(`/rooms/${code}`)}
                  >
                    Ikutan voting
                  </Button>
                </div>

                <Button
                  size="lg"
                  color="pink"
                  variant="text"
                  className="inline-flex items-center justify-center gap-1 text-base capitalize"
                  onClick={() => router.push("/dashboard")}
                >
                  <HiOutlineArrowLeft />
                  Kembali ke dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
