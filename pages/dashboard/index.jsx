import Head from "next/head";

// import material-components
import { Button, Typography } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import CardVoting from "@/components/CardVoting";

export default function Dashboard() {
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
            <Typography
              variant="h1"
              className="max-w-[750px] justify-self-center text-center font-extrabold capitalize text-gray-900"
            >
              Pusat kontrol pemungutan suara online anda 🤖️
            </Typography>

            <div className="grid gap-8">
              <div className="grid gap-4">
                <Typography
                  variant="h4"
                  className="font-bold capitalize text-gray-900"
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
                      className="h-[48px] w-[160px] text-base capitalize"
                    >
                      Ikutan voting
                    </Button>
                    <Button
                      size="lg"
                      color="pink"
                      className="h-[48px] w-[160px] text-base capitalize"
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
                    className="font-semibold text-gray-600"
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
