"use client";
/* global google */

import "./globals.css";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { start } from "@/helper";

export default function App() {
  let router = useRouter();
  let { category, origin, destination } = useSelector((state) => state.store);

  const { tab } = useSelector((state) => state.store);

  React.useEffect(() => {
    start(origin, destination, category, tab, router);
  }, []);

  return <div>Map loading...</div>;
}
