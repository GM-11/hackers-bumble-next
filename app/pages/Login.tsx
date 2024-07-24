"use client";
import React, { useState } from "react";
import { Role, Gender, Os } from "../lib/utils/types";
import RoleOsGender from "../components/loginPage/RoleOsGender";
import NameEmailPass from "../components/loginPage/NameEmailPass";
import Bio from "../components/loginPage/Bio";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(Role.NOT_SELECTED);
  const [bio, setBio] = useState("");
  const [os, setOs] = useState<Os>(Os.NOT_SELECTED);
  const [gender, setGender] = useState<Gender>(Gender.NOT_SELECTED);
  const [loginState, setLoginState] = useState(0);

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
          <Bio bio={bio} setBio={setBio} setLoginState={setLoginState} />
        )}
      </section>
      <section className="col-span-1 bg-[url('/images/login_image.jpg')] bg-no-repeat bg-cover md:w-[50%] md:h-screen h-[50%] bg-center"></section>
    </div>
  );
}

export default Login;
