// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import CardVoting from "@/components/CardVoting";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { Button, Typography } from "@material-tailwind/react";
import Head from "next/head";

// import utils
import fetcher from "@/utils/fetcher";
import swrfetcher from "@/utils/swrfetcher";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Dashboard(props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const {
    data: rooms,
    mutate,
    isLoading,
  } = useSWR("/rooms", swrfetcher, {
    revalidateOnFocus: false,
    fallback: props.rooms,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const filteredRooms = rooms.data.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Head>
        <title>Dashboard Ponic. - Kontrol voting kamu disini!</title>
      </Head>

      <Layout>
        {/* ==== hero section ==== */}
        <section className="pb-16 pt-40">
          <div className="container grid gap-16">
            <div className="justify-self-center text-center">
              <Typography
                color="blue-gray"
                className="max-w-[750px] text-[32px] font-extrabold capitalize dark:text-white sm:text-[48px]"
              >
                Pusat kontrol pemungutan suara online anda 🤖️
              </Typography>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-4">
                <Typography
                  color="blue-gray"
                  className="text-[20px] font-bold capitalize dark:text-white sm:text-[24px]"
                >
                  List voting punya kamu
                </Typography>

                <div className="flex flex-col items-center gap-8 md:flex-row">
                  <Form
                    type="text"
                    placeholder="Cari voting yang sudah dibuat..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                  />

                  <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
                    <Button
                      size="lg"
                      color="pink"
                      variant="outlined"
                      className="h-[52px] w-full text-base capitalize md:w-[160px]"
                      onClick={() => router.push("/rooms")}
                    >
                      Ikutan voting
                    </Button>
                    <Button
                      size="lg"
                      color="pink"
                      className="w-full text-base capitalize md:w-[160px]"
                      onClick={() => router.push("/dashboard/create")}
                    >
                      Buat voting
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-start justify-center gap-8 2xl:justify-start">
                {rooms.data.length == 0 ? (
                  <div className="flex h-[300px] w-full items-center justify-center rounded-lg border-[4px] border-dashed border-gray-200 dark:border-gray-900">
                    <Typography
                      color="gray"
                      className="text-base font-semibold dark:text-white sm:text-[20px]"
                    >
                      Kamu belum punya voting nih 😚
                    </Typography>
                  </div>
                ) : filteredRooms.length > 0 ? (
                  filteredRooms.map((room, index) => {
                    return (
                      <CardVoting key={index} room={room} mutate={mutate} />
                    );
                  })
                ) : (
                  <div className="flex h-[300px] w-full items-center justify-center rounded-lg border-[4px] border-dashed border-gray-200 dark:border-gray-900">
                    <Typography
                      color="gray"
                      className="text-base font-semibold dark:text-white sm:text-[20px]"
                    >
                      Voting yang dicari gak ada boss 😝
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  try {
    const { data } = await fetcher("/rooms", "GET", null, token);

    return {
      props: {
        rooms: data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: `/ups?code=${error.response.status}`,
      },
    };
  }
}
