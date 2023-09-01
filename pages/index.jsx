import Head from "next/head";

// import material-components
import { Button } from "@material-tailwind/react";

// import components
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Selamat datang di Ponic. - Aplikasi voting berbasis web terbaik di
          Indonesia.
        </title>
      </Head>

      <Layout>
        {/* ==== hero section ==== */}
        <section className="pb-16 pt-32">hero section</section>
      </Layout>
    </>
  );
}
