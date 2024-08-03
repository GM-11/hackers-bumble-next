"use client";
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import { Role, Os, Lang, Gender } from "./lib/types";
import UserCard from "./components/UserCard";

type u = {
  id: any;
  name: string;
  email: string;
  role: Role[];
  os: Os;
  langs: Lang[];
  gender: string;
};
async function getMatches(gender: Gender) {
  const res = await fetch(`http://localhost:3000/api/matches?gender=female`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return data;
  }
}

function Page() {
  const [matches, setMatches] = useState<u[]>([]);

  useEffect(() => {
    async function getMatches() {
      const res = await fetch(
        `http://localhost:3000/api/matches?gender=female`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setMatches(data);
      }
    }
    getMatches();
    return;
  }, []);

  return (
    <>
      <h1>Logged in </h1>
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        Log out
      </button>
      <br /> <br /> {matches.length}
      {matches.map((match) => {
        return <UserCard key={match.id} match={match} />;
      })}
    </>
  );
}

export default Page;
