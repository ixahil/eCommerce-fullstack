import Header from "@/components/shop/header";
import Navbar from "@/components/shop/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = (props: Props) => {
  return (
    <div className="">
      <Header />
      <Navbar />
    </div>
  );
};

export default PublicLayout;
