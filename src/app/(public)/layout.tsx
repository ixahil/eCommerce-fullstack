import {
  Heart,
  LucideRecycle,
  Recycle,
  ShoppingCart,
  User,
} from "lucide-react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = (props: Props) => {
  return (
    <div className="px-8">
      <Header />
      <Navbar />
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <Announcement />
      <div className="flex items-center justify-between">
        <h1>Digitec.</h1>
        <p>search</p>
        <div className="flex items-center gap-12">
          <LucideRecycle />
          <Heart />
          <div className="flex items-center">
            <User />
            <p>
              Log in <br></br>My Account
            </p>
          </div>
          <ShoppingCart />
        </div>
      </div>
    </header>
  );
};

const Announcement = () => {
  return (
    <div className="flex items-center justify-between">
      <p>Free Shipping Over $100 & Free Returns</p>
      <div className="flex items-center gap-12">
        <p>Hotline:(888) 4344 6000-(888) 1338 8193</p>
        <p>United States (USD $)</p>
      </div>
    </div>
  );
};

const Navbar = () => {
  return <>Navbar</>;
};
export default PublicLayout;
