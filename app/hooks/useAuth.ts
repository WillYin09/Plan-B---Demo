"use client";
import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("isAuthed") === "true";
    const name = localStorage.getItem("username") || "";
    setIsAuthed(auth);
    setUsername(name);
  }, []);

  return { isAuthed, username };
}
