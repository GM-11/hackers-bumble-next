"use client";
import React, { useState } from "react";
import { Role, Gender, Os, Lang } from "../lib/types";
import RoleOsGender from "../components/loginPage/RoleOsGender";
import NameEmailPass from "../components/loginPage/NameEmailPass";
import Bio from "../components/loginPage/LangsBio";
import { redirect, useRouter } from "next/navigation";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(Role.NOT_SELECTED);
  const [langs, setLangs] = useState<Lang[]>([]);
  const [bio, setBio] = useState("");
  const [os, setOs] = useState<Os>(Os.NOT_SELECTED);
  const [gender, setGender] = useState<Gender>(Gender.NOT_SELECTED);
  const [loginState, setLoginState] = useState(0);
  const router = useRouter();

  async function submit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        role,
        os,
        bio,
        langs,
        gender,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      const userData = {
        name,
        email,
        id: data._id,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      redirect("/");
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <section className="col-span-1 flex flex-col px-16 justify-center items-start md:w-[50%] md:h-screen h-[50%]">
        {loginState === 0 && (
          <NameEmailPass
            name={name}
            email={email}
            password={password}
            setEmail={setEmail}
            setName={setName}
            setPassword={setPassword}
            setLoginState={setLoginState}
          />
        )}

        {loginState === 1 && (
          <RoleOsGender
            os={os}
            role={role}
            gender={gender}
            setOs={setOs}
            setRole={setRole}
            setGender={setGender}
            setLoginState={setLoginState}
          />
        )}
        {loginState === 2 && (
          <Bio
            langs={langs}
            setLangs={setLangs}
            bio={bio}
            setBio={setBio}
            setLoginState={setLoginState}
            submit={submit}
          />
        )}
      </section>
      <section className="col-span-1 bg-[url('/images/login_image.jpg')] bg-no-repeat bg-cover md:w-[50%] md:h-screen h-[50%] bg-center"></section>
    </div>
  );
}

export default Login;
