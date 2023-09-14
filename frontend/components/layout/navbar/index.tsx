import MobileHeader from "./mobile-header";

export default function Navbar() {
  return (
    <nav className="w-full">
      <div className="block md:hidden">
        <MobileHeader />
      </div>
    </nav>
  );
}
