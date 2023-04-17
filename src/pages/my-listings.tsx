import { type NextPage } from "next";
import Head from "next/head";
import Card from "~/components/Card";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const listing = api.listings.myListings.useQuery();

  return (
    <>
      <Head>
        <title>Gimme</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Minhas ordens de compra
          </h1>
          {listing.isLoading ? (
            <p>Loading...</p>
          ) : (
            listing.data?.map((item) => {
              return <Card listing={item} key={item.id} />;
            })
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
