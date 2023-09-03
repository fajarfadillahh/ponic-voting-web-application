import Head from "next/head";
import { useRouter } from "next/router";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import CardVoting from "@/components/CardVoting";

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Selamat datang di Jujurly. - Aplikasi voting berbasis web terbaik di
          Indonesia!
        </title>
      </Head>

      <Layout>
        {/* ==== hero section ==== */}
        <section className="pb-16 pt-40">
          <div className="container grid gap-16">
            <div className="justify-self-center text-center">
              <Typography
                variant="h1"
                color="blue-gray"
                className="max-w-[750px] font-extrabold capitalize"
              >
                Pusat kontrol pemungutan suara online anda 🤖️
              </Typography>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-4">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="font-bold capitalize"
                >
                  List voting punya kamu
                </Typography>

                <div className="flex items-center gap-8">
                  <Form
                    type="text"
                    placeholder="Cari voting yang sudah dibuat..."
                    className="w-full"
                  />

                  <div className="inline-flex items-center gap-8">
                    <Button
                      size="lg"
                      color="pink"
                      variant="outlined"
                      className="h-[52px] w-[160px] text-base capitalize"
                      onClick={() => router.push("/rooms")}
                    >
                      Ikutan voting
                    </Button>
                    <Button
                      size="lg"
                      color="pink"
                      className="w-[160px] text-base capitalize"
                      onClick={() => router.push("/dashboard/create")}
                    >
                      Buat voting
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-8">
                {/* ==== no data voting ==== */}
                {/* <div className="flex h-[300px] w-full items-center justify-center rounded-lg border-[4px] border-dashed border-gray-200">
                  <Typography
                    variant="h5"
                    color="gray"
                    className="font-semibold"
                  >
                    Kamu belum punya voting nih 😚
                  </Typography>
                </div> */}

                {/* ==== card voting / with data voting ==== */}
                <CardVoting />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
