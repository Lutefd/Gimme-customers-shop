/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Listing = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Card({ listing }: { listing: Listing }) {
  return (
    <div className=" max-w-sm rounded-lg border border-gray-700 bg-gray-800 shadow">
      <Link href="#">
        <img
          className="max-h-[282px] max-w-[350px] rounded-t-lg"
          src={listing.image}
          alt={listing.name}
          width={360}
        />
      </Link>
      <div className="p-5">
        <Link href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {listing.name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-400">{listing.description}</p>
        <Link
          href={`/listings/${listing.id}`}
          className="inline-flex items-center rounded-lg bg-[hsl(280,100%,50%)] px-4 py-3 text-center text-sm font-medium hover:bg-[hsl(280,100%,70%)] focus:ring-4 focus:ring-[hsl(280,100%,40%)]"
        >
          Ver mais
          <svg
            aria-hidden="true"
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
