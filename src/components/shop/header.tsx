import SearchBar from "@/app/(public)/search";
import { Heart, LucideRecycle, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#151C25] text-white space-y-4 py-4">
      <Announcement />
      <hr />
      <div className="flex items-center justify-between px-16 py-4">
        <h1 className="text-4xl font-bold">Digitec.</h1>
        <SearchBar />
        <div className="flex items-center gap-12">
          <LucideRecycle size={42} />
          <Heart size={42} />
          <div className="flex items-center gap-2">
            <User size={42} />
            <p className="text-xs">
              Log in <br></br>My Account
            </p>
          </div>
          <ShoppingCart size={42} />
        </div>
      </div>
    </header>
  );
};

const Announcement = () => {
  return (
    <div className="flex items-center justify-between px-16 text-sm">
      <p>Free Shipping Over $100 & Free Returns</p>
      <div className="flex items-center gap-12">
        <p>Hotline:(888) 4344 6000-(888) 1338 8193</p>
        <p>United States (USD $)</p>
      </div>
    </div>
  );
};

export default Header;
