"use client"

import { cookies } from 'next/headers'
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import React, {SyntheticEvent, useState} from "react";
import style from './style.module.css'
import Link from 'next/link'

export default function Login_form(token) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const authenticate_user = async ( ) => {
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

      await router.push("/album");

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await authenticate_user();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={style.form_login}
    >

      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu e-mail..."
        name="email"
        className={style.email_input}
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha..."
        name="password"
        className={style.password_input}
      />

      <button  className={style.submit_button}>Logar</button>
        <p className={style.google_link}>Realize o login com o <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://127.0.0.1:8000/google/get_redirect/&prompt=consent&response_type=code&client_id=569822372617-j0s75nccs3o8nl748eshujie1br1mr2v.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline">
           <u className={style.google_underline}>Google</u>
          </a>
        </p>
        <p className={style.google_link}>Não possui uma conta? <Link href="/cadastro">
           <u className={style.google_underline}>Cadastre-se</u>
          </Link>
        </p>
        
    </form>
  );
}