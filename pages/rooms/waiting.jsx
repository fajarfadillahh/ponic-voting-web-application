// import components
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

// import utils
import { convertTime } from "@/utils/convert";
import { useState, useEffect } from "react";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function Waiting({ room }) {
  const [distance, setDistance] = useState(room.data.start - Date.now());
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      if (distance <= 0) {
        return (window.location.href = `/rooms/${room.data.code}`);
      }
      setDistance(room.data.start - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [distance, room.data.start, room.data.code]);

  return (
    <>
      <Head>
        <title>Harap tunggu sebentar gess.</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-40">
          <div className="container grid gap-12">
            <Image
              src={`/assets/img-${theme == "dark" ? "6-white" : "6"}.svg`}
              alt="image"
              width={350}
              height={330}
              className="justify-self-center"
              priority={true}
            />

            <div className="text-center">
              <Typography
                color="blue-gray"
                className="mb-3 text-[32px] font-extrabold capitalize dark:text-white sm:text-[36px]"
              >
                Ehem, votingnya belum dimulai nih 😚
              </Typography>
              <Typography
                variant="paragraph"
                color="gray"
                className="mx-auto mb-8 max-w-[550px] font-medium dark:text-white"
              >
                Voting ini akan di mulai{" "}
                <span className="font-extrabold text-pink-500">
                  {convertTime(room.data.start)}
                </span>
                . Jadi dipersilakan untuk beli cemilan dan minuman untuk
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

export async function getServerSideProps({ query, req }) {
  const token = req.cookies.token;
  const { code } = query;

  if (!code) {
    return {
      redirect: {
        destination: "/rooms",
      },
    };
  }

  try {
    const { data } = await fetcher(`/rooms?code=${code}`, "GET", null, token);

    if (Date.now() > data.data.start) {
      return {
        redirect: {
          destination: `/rooms/${code}`,
        },
      };
    }

    return {
      props: {
        room: data,
      },
    };
  } catch (error) {
    if (error.response.status == 404) {
      return {
        redirect: {
          destination: "/rooms?code=404",
        },
      };
    }

    return {
      redirect: {
        destination: `/ups?code=${error.response.status}`,
      },
    };
  }
}
