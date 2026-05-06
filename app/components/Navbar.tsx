import React from "react";

interface NavbarProps {
    title?: string;
}

const Navbar: React.FC<NavbarProps> = ({title="Weather App"}) => {
  return (
    <nav className="show-sm stiky top-0 left-0 z-50 bg-white ">{title}</nav>
  );
};

export default Navbar;
