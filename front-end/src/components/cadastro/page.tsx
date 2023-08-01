"use client"

import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import React, { useState, SyntheticEvent, useEffect, useCallback } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios'
import style from './style.module.css'


export default function Sign_up_form() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const router = useRouter();

    const handleSubmit = async (e:SyntheticEvent) => {
        e.preventDefault();
  
        const body = {
            'email' : email,
            'password1' : password,
            'password2' : password2
        }
        console.log(body)
        try {

            const response = await axios.post(
                'http://127.0.0.1:8000/user/registration/',
                body,
            )
            
            
            const coockie = await response.data.access
            const coockie_access = coockie
            console.log(coockie)

            deleteCookie('access', { path: 'http://127.0.0.1:8000/user/login/', domain: 'http://127.0.0.1:8000' });
            setCookie('access', coockie_access)

            await router.push("/album/list");

            
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <main>
        
        <form onSubmit={handleSubmit}className={style.form_cadastro} action="">
            <input type="Email" placeholder='E-mail...' className={style.email} onChange={(e) => setEmail(e.target.value)} name='email'/>
            <input type="password" placeholder='Senha...' className={style.password_input1} onChange={(e) => setPassword(e.target.value)} name='password1'/>
            <input type="password" placeholder='Confirme a sua senha...' className={style.password_input2} onChange={(e) => setPassword2(e.target.value)} name='password2'/>
            <button className={style.create_account} >Criar Conta</button>
        </form>
        
    </main>
  );
}