import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { Iproducts } from "@/types";
import Card from "@/components/Card";
import Error from "@/components/Error";
const Home: NextPage<Iproducts> = ({ data }) => {
  if (!data) {
    return <Error message="An error occured !" />;
  }
  return (
    <div className="grid mt-2 sm:grid-cols-4 gap-4 max-w-screen-2xl justify-center px-4">
      {data?.length > 0 &&
        data?.map((item, index) => {
          return <Card key={item.id} item={item} index={index} />;
        })}
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return {
    props: { data },
  };
};

export default Home;
