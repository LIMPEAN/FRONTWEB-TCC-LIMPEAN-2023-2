"use client";
import { useEffect, useState } from "react";
import { Profile, ProfilePreview } from "./components/Profile";

export default function Home() {
  let token: string | null = null;
  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
  }, []);

  return <ProfilePreview />;
}
