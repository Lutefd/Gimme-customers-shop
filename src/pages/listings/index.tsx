/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Card from "~/components/Card";
import Loading from "~/components/Loading";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [page, setPage] = useState(0);
  const { data, fetchNextPage } = api.listings.getBatch.useInfiniteQuery(
    {
      limit: 8,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  if (!data)
    return (
      <div className="grid h-screen place-items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Loading />
      </div>
    );

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    return setPage(page + 1);
  };

  const handleFetchPreviousPage = () => {
    setPage(page - 1);
  };

  const listing = data?.pages[page];

  return (
    <>
      <Head>
        <title>Todas as Ordens | Gimme</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Gim<span className="text-[hsl(280,100%,70%)]">me</span> Shop
          </h1>
          <p className="text-center text-2xl font-medium text-white">
            Todos as ordens de compra
          </p>
          <div
            className={
              !listing?.listedItems
                ? "grid place-items-center"
                : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            }
          >
            {!listing?.listedItems ? (
              <Loading />
            ) : (
              listing?.listedItems.map((item) => {
                return <Card listing={item} key={item.id} />;
              })
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              className="text-md inline-flex items-center rounded-lg bg-[hsl(280,100%,50%)] px-8 py-4 text-center font-medium hover:bg-[hsl(280,100%,70%)] focus:ring-4 focus:ring-[hsl(280,100%,40%)] disabled:bg-slate-500"
              onClick={() => handleFetchPreviousPage()}
              disabled={page === 0}
            >
              <svg
                aria-hidden="true"
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Anterior
            </button>
            <button
              className={
                "text-md inline-flex items-center rounded-lg bg-[hsl(280,100%,50%)] px-8 py-4 text-center font-medium hover:bg-[hsl(280,100%,70%)] focus:ring-4 focus:ring-[hsl(280,100%,40%)] disabled:bg-slate-500"
              }
              onClick={() => handleFetchNextPage()}
              disabled={!listing?.nextCursor}
            >
              Próximo
              <svg
                aria-hidden="true"
                className="ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
