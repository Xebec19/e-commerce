import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";

export default function Navbar() {
  return (
    <nav className="w-full">
      <div className="block md:hidden">
        <MobileHeader />
      </div>

      <div className="hidden md:block">
        <DesktopHeader />
      </div>
    </nav>
  );
}
