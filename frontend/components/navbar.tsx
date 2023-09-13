"use client";

import { MdMenu } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";
import Button from "./ui/button";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(false);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <nav className="py-4 flex justify-around items-center">
      <Button>
        <MdMenu onClick={toggleSidebar} />
      </Button>
      <span>E-commerce</span>
      <Button>
        <AiOutlineShoppingCart />
      </Button>
    </nav>
  );
}
