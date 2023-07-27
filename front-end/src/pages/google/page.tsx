import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import { useRouter } from "next/router";
import { setCookie, deleteCookie } from 'cookies-next';

interface url {
    url: string,
}


export default function drive() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState('')
    const [code, setCode] = useState('')
    const [token, setToken] = useState('')
    const router = useRouter();

    useEffect(() => {
        
        
        async function fetchurl() {
          try {
            const response = await axios.get<url>('http://127.0.0.1:8000/api/GoogleUrlViewSet/');
    
            setData(response.data);
            console.log(response.data.url)
            const x = response.data.url
            const post = {
                    "access_token": "",
                    "code":  response.data.url,
                    "id_token": ""
                }
            /* const token_return = await fetch("http://127.0.0.1:8000/google/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post),       
            }); */
            setCode(response.data.url)
            await setCookie('access', '') 
            /* console.log( await token_return, '<<<<<<<<')


            const coockie = await token_return.json()
            const coockie_access = coockie.access
            
            console.log(coockie_access)

            await deleteCookie('access', { path: 'http://127.0.0.1:8000/user/login/', domain: 'http://127.0.0.1:8000' });
            await setCookie('access', coockie_access)  */

           /*  await router.push("http://127.0.0.1:3000/album/all"); */

          } catch (error) {
            console.error('Google access key error:', error);
            setIsLoading(false);
          }
        }
    
        fetchurl();
      }, []);
      


  return (
    <main className="flex flex-col h-screen">
        <form action="http://127.0.0.1:8000/google/login" method='post' >
          <input type="text" name='code' value={code}/>
          <button type="submit">continuar</button>
        </form>
    </main>
  );
}