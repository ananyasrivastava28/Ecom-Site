import { sliceWords, upperFirst } from "@/utils";
import Image from "next/image";
import React, { FC } from "react";
import Rating from "./Rating";
import Link from "next/link";
import { Iproduct } from "@/types";

type TCardProps = {
  item: Iproduct;
  index: number;
};

const Card: FC<TCardProps> = ({ item, index }) => {
  return (
    <div
      key={index}
      className="relative border py-4 block overflow-hidden group rounded-xl"
    >
      <Image
        src={item.image}
        alt="asdas"
        width={300}
        height={100}
        className="object-contain w-full aspect-square transition duration-500 group-hover:scale-105 sm:h-72"
      />
      <div className="relative p-6 bg-white border-gray-100">
        <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
          {upperFirst(item.category)}
        </span>
        <Rating item={item} />
        <h3 className="mt-4 text-sm font-medium text-gray-900">
          {sliceWords(item.title, 5)}
        </h3>
        <p className="mt-1.5 text-sm text-gray-700">${item.price}</p>
        <div className="mt-4">
          <Link
            href={`/product/${item.id}`}
            className="block w-full p-2 text-center text-sm font-medium transition bg-yellow-400 rounded hover:scale-105"
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
