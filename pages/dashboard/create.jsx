import Head from "next/head";
import Image from "next/image";
import Flatpickr from "react-flatpickr";
import Cookies from "js-cookie";
import { HiOutlineArrowLeft, HiOutlinePlus } from "react-icons/hi";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useState } from "react";

// reactflatpicr css
import "flatpickr/dist/flatpickr.css";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import CandidateForm from "@/components/Candidate/CandidateForm";

// import utils
import fetcher from "@/utils/fetcher";
import LoadingButton from "@/components/Loading/LoadingButton";

export default function CreateVoting() {
  const router = useRouter();
  const token = Cookies.get("token");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [candidates, setCandidates] = useState([]);
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

  const handleCreateVoting = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetcher(
        "/rooms",
        "POST",
        {
          name: title,
          start: startDate,
          end: endDate,
          candidates: candidates,
        },
        token,
      );

      if (data.success) {
        return router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Buat voting kamu sekarang!</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-40">
          <div className="container grid gap-14">
            <div className="grid grid-cols-2 items-center gap-8">
              <div>
                <Typography
                  variant="h1"
                  color="blue-gray"
                  className="mb-2 font-extrabold capitalize"
                >
                  Buat voting kamu <br /> sekarang 🙌
                </Typography>
                <Typography
                  variant="paragraph"
                  color="gray"
                  className="mb-8 font-medium"
                >
                  Pembuatan ruang voting yang sangat praktis dan <br /> gak
                  ribet, jadi buruan buat votingmu sekarang!
                </Typography>
                <Button
                  size="lg"
                  color="gray"
                  variant="text"
                  className="inline-flex items-center gap-1 text-base capitalize"
                  onClick={() => router.push("/dashboard")}
                >
                  <HiOutlineArrowLeft />
                  Kembali ke dashboard
                </Button>
              </div>

              <Image
                src="/assets/img-4.svg"
                width={580}
                height={420}
                alt="hero img"
              />
            </div>

            <div className="grid gap-16">
              <div className="grid gap-6">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold capitalize"
                >
                  Detail voting
                </Typography>

                <div className="grid max-w-[600px] gap-4">
                  <div className="grid gap-1">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="font-bold capitalize"
                    >
                      Judul voting
                    </Typography>
                    <Form
                      type="text"
                      placeholder="Contoh: Pemilihan Ketua Osis"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="inline-flex items-center justify-between gap-8">
                    <div className="grid gap-1">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="w-[280px] font-bold capitalize"
                      >
                        Waktu mulai
                      </Typography>
                      <Flatpickr
                        data-enable-time
                        options={{ time_24hr: true, minDate: Date.now() }}
                        onClose={(date) => setStartDate(date[0].getTime())}
                        placeholder="Pilih waktu mulai"
                        className="flatpickr-class"
                      />
                    </div>

                    <div className="grid gap-1">
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="w-[280px] font-bold capitalize"
                      >
                        Waktu selesai
                      </Typography>
                      <Flatpickr
                        data-enable-time
                        options={{ time_24hr: true, minDate: startDate }}
                        onClose={(date) => setEndDate(date[0].getTime())}
                        placeholder="Pilih waktu selesai"
                        className="flatpickr-class"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold capitalize"
                >
                  Kandidat / opsi
                </Typography>

                <div className="flex flex-wrap items-start gap-5">
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
                      className="flex aspect-square h-[64px] w-[64px] cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-[2rem] text-gray-700 hover:bg-pink-500 hover:text-white"
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
                  className="w-[170px] justify-self-end text-base capitalize"
                  onClick={handleCreateVoting}
                >
                  Buat voting 🚀
                </Button>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
