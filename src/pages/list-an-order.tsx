/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type Inputs = {
  name: string;
  description: string;
  price: string;
  image: string;
};

const ListOrder: NextPage = () => {
  const createOrder = api.listings.create.useMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createOrder
      .mutateAsync({
        ...data,
        price: parseFloat(data.price),
      })
      .then(async () => {
        await router.push("/my-listings");
      });
  };

  return (
    <>
      <Head>
        <title>Nova Ordem | Gimme</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
            Criar uma nova ordem de compra
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6 grid gap-6 ">
            <div className="d">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Nome do produto
              </label>
              <input
                {...register("name", { required: true })}
                id="name"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <span className="text-red-500">Esse campo é obrigatorio</span>
              )}
            </div>

            <div className="">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-white"
              >
                Descrição do produto
              </label>
              <textarea
                {...register("description", { required: true })}
                id="description"
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.description && (
                <span className="text-red-500">Esse campo é obrigatorio</span>
              )}
            </div>
            <div className="">
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-white"
              >
                O quanto você quer pagar?
              </label>
              <input
                type="number"
                step="0.01"
                id="price"
                {...register("price", { required: true })}
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.price && (
                <span className="text-red-500">Esse campo é obrigatorio</span>
              )}
            </div>
            <div className="">
              <label
                htmlFor="description"
                id="description"
                className="mb-2 block text-sm font-medium text-white"
              >
                Url da imagem do produto desejado
              </label>
              <input
                type="url"
                id="image"
                {...register("image", { required: true })}
                className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.image && (
                <span className="text-red-500">Esse campo é obrigatorio</span>
              )}
            </div>

            <button
              type="submit"
              className="mb-2 self-center rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800  active:scale-95"
            >
              Criar
            </button>
          </form>{" "}
        </div>
      </main>
    </>
  );
};

export default ListOrder;
