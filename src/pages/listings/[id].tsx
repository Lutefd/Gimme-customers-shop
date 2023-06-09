/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import Loading from "~/components/Loading";

type Inputs = {
  message: string;
};

const Home: NextPage = () => {
  const user = useUser();
  const router = useRouter();
  const listing = api.listings.getItem.useQuery(
    {
      listingId: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );
  const sendMessage = api.messages.sendMessages.useMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const listingId = router.query.id as string;
    const message = data.message;
    if (!listing.data) return;
    const listingName = listing.data[0]?.item.name;

    await sendMessage
      .mutateAsync({
        listingId,
        message,
        listingName: listingName || "",
      })
      .then(() => reset());
  };

  if (!listing.data)
    return (
      <div className="grid h-screen place-items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Loading />
      </div>
    );
  const item = listing.data[0]?.item;
  const author = listing.data[0]?.author;

  if (!item)
    return (
      <div className="grid h-screen place-items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Loading />
      </div>
    );

  return (
    <>
      <Head>
        <title>{item.name} || Gimme</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center rounded-lg  md:max-w-5xl md:flex-row ">
            <img
              className="h-full w-full rounded-t-lg  md:w-96 md:rounded-r-none"
              src={item.image}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-5xl font-bold tracking-tight text-white">
                {item.name}
              </h5>
              <p className="mb-6 text-2xl font-normal text-gray-400">
                {item.description}
              </p>
              <p className="mb-1 text-xl font-normal text-gray-400">
                Preço Desejado: R${item.price}
              </p>
              <p className="text-md mb-6 font-normal text-gray-400">
                Pedido por: {author?.firstName} {author?.lastName}
              </p>
              {!user.isSignedIn && (
                <button className="text-md mt-6 inline-flex items-center rounded-lg bg-[hsl(280,100%,50%)] px-12 py-4 text-center font-medium hover:bg-[hsl(280,100%,70%)] focus:ring-4 focus:ring-[hsl(280,100%,40%)]">
                  <Link
                    href="/sign-in"
                    className="mx-auto self-center text-center"
                  >
                    {" "}
                    Mandar mensagem{" "}
                  </Link>
                </button>
              )}

              {user.isSignedIn && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    className="mb-4 w-full rounded bg-gray-200 px-4 py-2 text-gray-700"
                    placeholder="Mande sua informação de contato para o dono do pedido. "
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <span className="text-sm text-red-500">
                      Esse campo é obrigatório
                    </span>
                  )}
                  <button
                    className="text-md mt-6 inline-flex items-center rounded-lg bg-[hsl(280,100%,50%)] px-12 py-4 text-center font-medium hover:bg-[hsl(280,100%,70%)] focus:ring-4 focus:ring-[hsl(280,100%,40%)]"
                    type="submit"
                  >
                    Mandar mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
