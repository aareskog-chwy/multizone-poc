"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  route?: string;
}

export const Button = ({ children, className, route }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={(e) => { e.preventDefault(); window.location.assign(route ? `/${route}` : '/')}}
    >
      {children}
    </button>
  );
};
