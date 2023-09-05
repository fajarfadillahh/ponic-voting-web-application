import Head from "next/head";
import Cookies from "js-cookie";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";
import CountDown from "@/components/Countdown/CountDown";
import CandidateItem from "@/components/Candidate/CandidateItem";
import LoadingScreen from "@/components/Loading/LoadingScreen";

// import utils
import fetcher from "@/utils/fetcher";
import swrfetcher from "@/utils/swrfetcher";

export default function Voting(props) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const token = Cookies.get("token");
  const router = useRouter();

  const {
    data: rooms,
    mutate,
    isLoading,
  } = useSWR(`/rooms/?code=${props.code}`, swrfetcher, {
    fallback: props.rooms,
    refreshInterval: Date.now() < props.rooms.data.end ? 10000 : false,
    revalidateOnFocus: false,
  });

  const handleSubmitVoting = async () => {
    try {
      const { data } = await fetcher(
        "/rooms/votes",
        "POST",
        {
          room_id: rooms.data.id,
          code: rooms.data.code,
          candidate: {
            id: selectedCandidate,
          },
        },
        token,
      );

      if (data.success) {
        mutate();

        const votes = JSON.parse(localStorage.getItem("votes"));

        votes.push({
          room_id: rooms.data.id,
        });

        localStorage.setItem("votes", JSON.stringify(votes));

        setIsAvailable(false);

        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    const votes = localStorage.getItem("votes");

    if (votes) {
      const parse = JSON.parse(votes);

      if (parse.find((vote) => vote.room_id == props.rooms.data.id)) {
        setIsAvailable(false);
      } else {
        setIsAvailable(true);
      }
    }

    if (Date.now() > props.rooms.data.end) {
      setIsAvailable(false);
    }
  }, [setIsAvailable]);

  if (!isClient) {
    return;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

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
                {rooms.data.name}
              </Typography>

              {/* countdown components */}
              <CountDown
                end={rooms.data.end}
                handleComplete={() => setIsAvailable(false)}
              />
            </div>

            <div className="grid w-full max-w-[850px] gap-6 justify-self-center">
              {rooms.data.candidates.map((candidate, index) => {
                return (
                  <CandidateItem
                    key={candidate.id}
                    candidate={candidate}
                    index={index}
                    isSelected={selectedCandidate === candidate.id}
                    isAvailable={isAvailable}
                    onClick={() => {
                      setSelectedCandidate(candidate.id);
                    }}
                  />
                );
              })}
            </div>

            <div className="grid justify-items-center gap-4">
              {isAvailable ? (
                <Button
                  size="lg"
                  color="pink"
                  className="text-base capitalize"
                  onClick={handleSubmitVoting}
                >
                  Kirim voting 🚀
                </Button>
              ) : (
                <div className="text-center">
                  <Typography
                    variant="h5"
                    color="red"
                    className="rounded-xl bg-red-50 px-4 py-2 font-bold"
                  >
                    Note: Kesempatan buat vote cuma 1 kali yaaa 😁
                  </Typography>
                </div>
              )}

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

export async function getServerSideProps({ params, req }) {
  const token = req.cookies.token;

  try {
    const { data, status } = await fetcher(
      `/rooms?code=${params.code}`,
      "GET",
      null,
      token,
    );

    if (data.success) {
      return {
        props: {
          rooms: data,
          code: params.code,
        },
      };
    }

    return {
      redirect: {
        destination: `/ups?code=${status}&message=${data.errors[0].message}`,
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
        destination: `/ups?code=${error.response.status}&message=${error.response.statusText}`,
      },
    };
  }
}
