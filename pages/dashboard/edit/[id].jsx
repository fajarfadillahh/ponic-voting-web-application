// reactflatpickr css
import "flatpickr/dist/flatpickr.css";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import CandidateForm from "@/components/Candidate/CandidateForm";
import LoadingButton from "@/components/Loading/LoadingButton";
import Head from "next/head";
import Image from "next/image";
import Flatpickr from "react-flatpickr";
import { HiOutlineArrowLeft, HiOutlinePlus } from "react-icons/hi";
import { Button, Tooltip, Typography } from "@material-tailwind/react";

// import utils
import fetcher from "@/utils/fetcher";
import toast from "@/utils/toast";
import messages from "@/utils/messages";
import { Indonesian } from "flatpickr/dist/l10n/id.js";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

export default function EditVoting({ rooms }) {
  const router = useRouter();
  const token = Cookies.get("token");
  const { theme } = useTheme();

  const [title, setTitle] = useState(rooms.data.name);
  const [startFromInput, setStartFromInput] = useState(null);
  const [endFromInput, setEndFromInput] = useState(null);
  const [startFromData, setStartFromData] = useState(rooms.data.start);
  const [endFromData, setEndFromData] = useState(rooms.data.end);
  const [candidates, setCandidates] = useState(rooms.data.candidates);
  const [isLoading, setIsLoading] = useState(false);

  const addCandidateForm = () => {
    const newCandidate = {
      name: "",
      id: candidates.length + 1,
    };
    setCandidates([...candidates, newCandidate]);
  };

  const removeCandidateForm = (id) => {
    const newCandidates = candidates.filter((candidate) => candidate.id !== id);

    setCandidates(newCandidates);
  };

  const handleCandidateName = (value, id) => {
    const indexOfCandidate = candidates.findIndex(
      (candidate) => candidate.id == id,
    );

    candidates[indexOfCandidate] = {
      id,
      name: value,
    };

    setCandidates([...candidates]);
  };

  const handleUpdateVoting = async () => {
    try {
      setIsLoading(true);
      const { data, status } = await fetcher(
        "/rooms",
        "PATCH",
        {
          room_id: rooms.data.id,
          name: title,
          start: startFromInput ? startFromInput : startFromData,
          end: endFromInput ? endFromInput : endFromData,
          candidates: candidates,
        },
        token,
      );

      if (data.success) {
        toast(messages[status]`edit`, "success");
        return router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);

      const response = error.response;

      if (response.status == 500) {
        return response.data.errors.map((error) => {
          toast(messages[error.code], "error");
        });
      }

      if (response.status == 403) {
        return router.push("/dashboard");
      }

      response.data.errors.map((error) => {
        toast(error.message, "error");
      });
    }
  };

  return (
    <>
      <Head>
        <title>Edit voting yang sudah dibuat!</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-40">
          <div className="container grid gap-14">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <Typography
                  color="blue-gray"
                  className="mb-2 text-[32px] font-extrabold capitalize dark:text-white sm:text-[48px]"
                >
                  Perbarui data <br /> anda di sini 🙌
                </Typography>
                <Typography
                  variant="paragraph"
                  color="gray"
                  className="mb-8 max-w-[320px] font-medium dark:text-white"
                >
                  Di halaman ini, anda dapat memperbarui informasi penting
                  dengan mudah.
                </Typography>
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

              <Image
                src={`/assets/img-${theme == "dark" ? "4-white" : "4"}.svg`}
                width={580}
                height={420}
                alt="hero img"
                className="hidden lg:block"
                priority={true}
              />
            </div>

            <div className="grid gap-16">
              <div className="grid gap-6">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold capitalize dark:text-white"
                >
                  Detail voting
                </Typography>

                <div className="grid max-w-[600px] gap-6">
                  <div className="grid gap-1">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-bold capitalize dark:text-white"
                    >
                      Judul voting
                    </Typography>
                    <Form
                      type="text"
                      placeholder="Contoh: Pemilihan Ketua Osis"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      setTitle={setTitle}
                    />
                  </div>

                  <div className="inline-flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between md:justify-normal">
                    <div className="grid gap-1">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="w-full font-bold capitalize dark:text-white md:w-[280px]"
                      >
                        Waktu mulai
                      </Typography>
                      <Flatpickr
                        data-enable-time
                        options={{
                          time_24hr: true,
                          minDate: Date.now(),
                          altInput: true,
                          altFormat: "l d/m/Y H:i",
                          locale: {
                            ...Indonesian,
                          },
                        }}
                        value={
                          startFromData > Date.now()
                            ? startFromData
                            : Date.now()
                        }
                        onClose={(date) => setStartFromInput(date[0].getTime())}
                        placeholder="Pilih waktu mulai"
                        className="flatpickr-class dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-700"
                      />
                    </div>

                    <div className="grid gap-1">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="w-full font-bold capitalize dark:text-white md:w-[280px]"
                      >
                        Waktu selesai
                      </Typography>
                      <Flatpickr
                        data-enable-time
                        options={{
                          time_24hr: true,
                          minDate: startFromInput,
                          altInput: true,
                          altFormat: "l d/m/Y H:i",
                          locale: {
                            ...Indonesian,
                          },
                        }}
                        value={endFromInput ? endFromInput : endFromData}
                        onClose={(date) => setEndFromInput(date[0].getTime())}
                        placeholder="Pilih waktu mulai"
                        className="flatpickr-class dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold capitalize dark:text-white"
                >
                  Kandidat / opsi
                </Typography>

                <div className="flex flex-wrap items-start gap-5 2xl:justify-start">
                  {candidates.map((candidate, index) => (
                    <CandidateForm
                      key={index}
                      candidate={candidate}
                      removeCandidateForm={removeCandidateForm}
                      index={index}
                      handleCandidateName={handleCandidateName}
                    />
                  ))}

                  {/* add candidates */}
                  <Tooltip
                    content="Tambahkan kandidat/opsi"
                    placement="top"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <div
                      className="flex aspect-square h-[64px] w-[64px] cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-[2rem] text-gray-700 hover:bg-pink-500 hover:text-white dark:bg-gray-900 dark:text-gray-700 dark:hover:bg-pink-500 dark:hover:text-white"
                      onClick={() => addCandidateForm()}
                    >
                      <HiOutlinePlus />
                    </div>
                  </Tooltip>
                </div>
              </div>

              {isLoading ? (
                <LoadingButton className="h-[52px] w-[170px] justify-self-end" />
              ) : (
                <Button
                  size="lg"
                  color="pink"
                  className="w-[210px] justify-self-end text-base capitalize"
                  onClick={handleUpdateVoting}
                >
                  Perbarui voting 🚀
                </Button>
              )}
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
      `/rooms?id=${params.id}`,
      "GET",
      null,
      token,
    );

    if (data.success) {
      const start = data.data.start;
      const end = data.data.end;

      if (Date.now() > start || Date.now() > end) {
        return {
          redirect: {
            destination: "/dashboard",
          },
        };
      }

      return {
        props: {
          rooms: data,
        },
      };
    }
  } catch (error) {
    if (error.response.status == 404) {
      return {
        redirect: {
          destination: "/404",
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
