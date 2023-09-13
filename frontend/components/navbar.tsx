"use client";

import { MdMenu } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(false);

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <nav className="py-4 flex justify-around items-center">
      <MdMenu onClick={toggleSidebar} />
      <span>E-commerce</span>
      <AiOutlineShoppingCart />
    </nav>
  );
}
