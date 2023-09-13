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
import LoadingButton from "@/components/Loading/LoadingButton";

// import utils
import fetcher from "@/utils/fetcher";
import swrfetcher from "@/utils/swrfetcher";
import toast from "@/utils/toast";
import messages from "@/utils/messages";

export default function Voting(props) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");
  const router = useRouter();

  const {
    data: rooms,
    mutate,
    isLoading,
  } = useSWR(`/rooms/?code=${props.code}`, swrfetcher, {
    fallback: props.rooms,
    refreshInterval: 10000,
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleSubmitVoting = async () => {
    try {
      setLoading(true);
      const { data, status } = await fetcher(
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
        toast(messages[status]`vote`, "success");

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      setLoading(false);

      const response = error.response;

      response.data.errors.map((error) => {
        toast(error.message, "error");
      });
    }
  };

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
                color="blue-gray"
                className="mx-auto max-w-[920px] text-[32px] font-extrabold capitalize dark:text-white sm:text-[48px]"
              >
                {rooms.data.name}
              </Typography>

              {/* countdown components */}
              <CountDown
                end={rooms.data.end}
                handleComplete={() =>
                  (window.location.href = `/rooms/result?code=${rooms.data.code}`)
                }
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
                    isAvailable={rooms.data.is_available}
                    onClick={() => {
                      setSelectedCandidate(candidate.id);
                    }}
                  />
                );
              })}
            </div>

            <div className="grid justify-items-center gap-4">
              {rooms.data.is_available ? (
                <>
                  {loading ? (
                    <LoadingButton className="h-[52px] w-[241px]" />
                  ) : (
                    <Button
                      size="lg"
                      color="pink"
                      className="min-w-[241px] text-base capitalize"
                      onClick={handleSubmitVoting}
                    >
                      Kirim voting 🚀
                    </Button>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <Typography
                    variant="h5"
                    color="red"
                    className="rounded-xl bg-red-100 px-4 py-2 font-bold text-red-500 dark:bg-red-50/20"
                  >
                    Note: Kesempatan buat vote cuma 1 kali yaaa 😁
                  </Typography>
                </div>
              )}

              <Button
                size="lg"
                color="pink"
                variant="text"
                className="inline-flex min-w-[241px] items-center gap-1 text-base capitalize"
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
    const { data } = await fetcher(
      `/rooms?code=${params.code}`,
      "GET",
      null,
      token,
    );

    if (data.success) {
      if (Date.now() < data.data.start) {
        return {
          redirect: {
            destination: `/rooms/waiting?code=${params.code}`,
          },
        };
      }

      if (Date.now() > data.data.end) {
        return {
          redirect: {
            destination: `/rooms/result?code=${params.code}`,
          },
        };
      }

      return {
        props: {
          rooms: data,
          code: params.code,
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
        destination: `/ups?code=${error.response.status}`,
      },
    };
  }
}
