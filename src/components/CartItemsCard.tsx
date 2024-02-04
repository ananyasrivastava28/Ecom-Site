import { ICartItems } from "@/types";
import { sliceWords } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MdOutlineDelete, MdOutlineRemoveShoppingCart } from "react-icons/md";

const CartItemsCard: FC<ICartItems> = ({
  cartItem,
  removeItem,
  Totalprice,
}) => {
  return (
    <div className="mt-8">
      <ul className="space-y-4">
        {cartItem.length > 0 ? (
          cartItem.map((item, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-start border  py-4 rounded-lg"
              >
                {item.image && (
                  <Link href={`/product/${item.id}`}>
                    <Image
                      width={80}
                      height={80}
                      src={item?.image}
                      alt="item"
                      className="object-contain aspect-square rounded"
                    />
                  </Link>
                )}
                <div className="text-sm ml-4">
                  <Link
                    href={`/product/${item.id}`}
                    className="text-gray-900 sm:hidden font-bold hover:text-yellow-700"
                  >
                    {item?.title && sliceWords(item?.title, 4)}
                  </Link>
                  <Link
                    href={`/product/${item.id}`}
                    className="text-gray-900 hidden sm:block font-bold hover:text-yellow-700"
                  >
                    {item?.title}
                  </Link>
                  <p className="my-2">Category: {item.category}</p>
                  <p className="my-2">Quantity : {item.quantity}</p>
                  <p className="my-2">Price: {item.price}</p>
                  <button
                    onClick={() => removeItem(item?.id)}
                    className="text-gray-600 mt-4 transition hover:text-red-600"
                  >
                    <span className="flex gap-2 items-center">
                      Remove item <MdOutlineDelete />
                    </span>
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-center flex-col items-center flex justify-center">
            <span className="my-4">Empty Cart </span>
            <MdOutlineRemoveShoppingCart className="text-2xl font-bold" />
          </p>
        )}
      </ul>
      {cartItem.length > 0 && (
        <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
              <div className="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>$ {Totalprice}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemsCard;
