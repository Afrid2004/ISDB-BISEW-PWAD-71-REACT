import { Link } from "react-router-dom";
import NavbarMenu from "./Navbar";

function Header() {
  return (
    <>
      <div className="border-bottom border-1 border-dark sticky-top">
        <NavbarMenu></NavbarMenu>
      </div>
    </>
  );
}

export default Header;
