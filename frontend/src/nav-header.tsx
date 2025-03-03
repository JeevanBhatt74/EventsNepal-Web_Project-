import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navigate = useNavigate();

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Link to={"/"}>
        <Tab setPosition={setPosition}>Home</Tab>
      </Link>
      <Link to={"/events"}>
        <Tab setPosition={setPosition}>Events</Tab>
      </Link>
      <Link to={"/book-event"}>
        <Tab setPosition={setPosition}>Book Now</Tab>
      </Link>
      {typeof Cookies.get("token") === "string" && (
        <Link to={"/profile"}>
          <Tab setPosition={setPosition}>Profile</Tab>
        </Link>
      )}
      {typeof Cookies.get("token") === "string" && (
        <button
          onClick={() => {
            Cookies.remove("token");
            navigate("/");
          }}
        >
          <Tab setPosition={setPosition}>
            <LogOut />
          </Tab>
        </button>
      )}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
}: {
  children: React.ReactNode;
  setPosition: any;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

export default NavHeader;
