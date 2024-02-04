import Loader from "@/components/Loader";
import { IProductitem, Iproduct } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { sliceWords } from "@/utils";
import { useCard } from "@/store/useCard";
import toast from "react-hot-toast";
import Error from "@/components/Error";
import Rating from "@/components/Rating";
import { AiOutlineHeart } from "react-icons/ai";
const Product = () => {
  const { addToWishlist, addToCart, wishListItems } = useCard((state) => state);
  const addItem = (item: IProductitem) => {
    try {
      addToCart(item);
      toast.success("Added to card !");
    } catch (_) {
      toast.error("An error occured");
    }
  };
  const addWishlist = (item: IProductitem) => {
    const isExist = wishListItems.find((product) => product.id === item.id);
    try {
      if (!isExist) {
        addToWishlist(item);
        toast.success("Added to Wishlist !");
      } else {
        toast.error("Item already Exist !");
      }
    } catch (_) {
      toast.error("An error occured");
    }
  };
  const { query } = useRouter();

  const fetchProduct = async (): Promise<Iproduct> => {
    const data = await axios.get<Iproduct>(
      `https://fakestoreapi.com/products/${query.id}`
    );
    return data.data;
  };
  const { data, isLoading, error } = useQuery(
    ["product", query.id],
    fetchProduct,
    {
      enabled: !!query.id,
    }
  );

  if (isLoading) {
    return <Loader />;
  } else if (error || typeof data === "string") {
    return <Error message="An error Occured  !" />;
  }

  return (
    <section>
      <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
            {data?.image && (
              <Image
                width={400}
                height={400}
                alt="Les Paul"
                src={data?.image}
                className="object-contain w-full aspect-square rounded-xl"
              />
            )}
          </div>
          <div className="sticky top-0">
            <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
              Pre Order
            </strong>
            <div className="flex justify-between mt-8">
              <div className="max-w-[45ch]">
                <h1 className="text-xl sm:text-2xl font-bold">{data?.title}</h1>
                <p className="mt-0.5 text-sm">Highest Rated Product</p>
                <div className="mt-2 -ml-0.5 flex">
                  {data && <Rating item={data} />}
                </div>
                <p className="text-lg font-bold my-2"> $ {data?.price}</p>
              </div>
            </div>
            <details className="group relative mt-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="block">
                <div>
                  <div className="prose max-w-none group-open:hidden">
                    <p>
                      {data?.description && sliceWords(data?.description, 12)}
                    </p>
                  </div>
                  <span className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
                    Read More
                  </span>
                </div>
              </summary>
              <div className="pb-6 prose max-w-none">{data?.description}</div>
            </details>
            <div className="grid-cols-2 my-6 grid gap-4 place-content-center">
              <button
                type="button"
                onClick={() =>
                  addItem({
                    title: data?.title,
                    category: data?.category,
                    price: data?.price,
                    id: data?.id,
                    image: data?.image,
                    quantity: 1,
                  })
                }
                className="flex justify-center px-4 py-3  text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() =>
                  addWishlist({
                    title: data?.title,
                    category: data?.category,
                    price: data?.price,
                    id: data?.id,
                    image: data?.image,
                    quantity: 1,
                  })
                }
                className="flex justify-center gap-2 px-2 items-center py-3  text-xs font-medium text-white bg-red-600 rounded hover:bg-red-500"
              >
                <span>
                  <AiOutlineHeart />
                </span>
                Add to Wishlist !
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
