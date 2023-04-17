import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Card from "~/components/Card";
import Loading from "~/components/Loading";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const listing = api.listings.listingLatestFour.useQuery();

  return (
    <>
      <Head>
        <title>Gimme Store</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Gim<span className="text-[hsl(280,100%,70%)]">me</span> Shop
          </h1>
          <p className="text-center text-2xl font-medium text-white">
            O que os compradores estão procurando no momento
          </p>
          <div
            className={
              listing.isLoading
                ? "grid place-items-center"
                : "grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            }
          >
            {listing.isLoading ? (
              <Loading />
            ) : (
              listing.data?.map((item) => {
                return <Card listing={item} key={item.id} />;
              })
            )}
          </div>
          <Link
            href="/listings"
            className="text-md inline-flex items-center rounded-lg bg-[hsl(280,100%,50%)] px-12 py-4 text-center font-medium hover:bg-[hsl(280,100%,70%)]  active:scale-95"
          >
            Ver Todas
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
