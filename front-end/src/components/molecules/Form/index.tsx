import React, {SyntheticEvent, useState} from "react";
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import { useRouter } from "next/router";
import { setCookie, deleteCookie } from 'cookies-next';

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const authenticate_user = async () => {
    const loginUrl = "http://127.0.0.1:8000/user/login/";

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const coockie = await response.json()
      const coockie_access = coockie.access
      console.log(coockie_access)

      deleteCookie('access', { path: 'http://127.0.0.1:8000/user/login/', domain: 'http://127.0.0.1:8000' });
      setCookie('access', coockie_access) 

      /* await router.push("/album/all"); */
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    /* e.preventDefault(); */

    try {
      console.log(email, password);
      await authenticate_user();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      action="http://127.0.0.1:8000/user/login/"
      className="flex flex-col justify-center gap-2"
    >
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu e-mail..."
        name="email"
        className={`bg-gray border border-black border-1 px-4 placeholder-gray-500 h-14 rounded`}
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha..."
        name="password"
        className={`bg-gray border border-black border-1 px-4 placeholder-gray-500 h-14 rounded`}
      />
      <Button text="ENTRAR" bgColor="white" type="submit" />
    </form>
  );
}