import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";

// import utils
import fetcher from "@/utils/fetcher";
import { convertTime } from "@/utils/convert";

export default function Result({ room }) {
  const router = useRouter();

  const winner = room.data.candidates.sort(
    (a, b) => b.percentage - a.percentage,
  );

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
                &quot;{winner[0].name}&quot;
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
                  {convertTime(room.data.start)}
                </span>
              </Typography>
              <Typography
                color="blue-gray"
                className="max-w-[580px] text-[28px] font-extrabold capitalize"
              >
                &quot;{room.data.name}&quot;
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

export async function getServerSideProps({ query, req }) {
  const token = req.cookies.token;

  const { code } = query;

  if (!code) {
    return {
      redirect: {
        destination: `/rooms`,
      },
    };
  }

  try {
    const { data } = await fetcher(`/rooms?code=${code}`, "GET", null, token);

    if (data.success) {
      if (Date.now() < data.data.end) {
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
    }
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
        destination: `/ups?code=${error.response.status}&message=${error.response.statusText}`,
      },
    };
  }
}
