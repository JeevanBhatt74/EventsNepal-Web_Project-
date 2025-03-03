import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export default function NavWrapper({ children }: PropsWithChildren) {
  const { pathname } = useLocation();

  if (pathname.includes("admin")) {
    return null;
  }

  return children;
}
