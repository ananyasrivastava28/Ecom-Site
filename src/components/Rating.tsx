import { Iproduct } from "@/types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ item }: { item: Iproduct }) => {
  return (
    <span className="flex my-3">
      {item?.rating.rate &&
        [...Array(5)].map((_, index) => (
          <span key={index}>
            {item.rating.rate > index ? <AiFillStar /> : <AiOutlineStar />}
          </span>
        ))}
    </span>
  );
};

export default Rating;
