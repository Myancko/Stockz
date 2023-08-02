"use client"

import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next';
import { setCookie, deleteCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import style from './style.module.css'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image';

interface User {

  email : string,
  last_login :  string,
  date_joined  : string

}

export default function User_data() {

  const [currentUser, setCurrentuser] = useState<User | null>(null)
  const [entrouData, setEntrou] = useState( )
  const [lastLoginData, setUltimoLogin] = useState( )

  useEffect(() => {
    const coockie = getCookie('access');
    async function fetchAlbums() {
      try {
        const response_user = await axios.get<User>('http://127.0.0.1:8000/api/user/', {
              headers: {
                Authorization: 'Bearer ' + coockie,
              },
            });

        setCurrentuser(response_user.data)
        
        var data_ = new Date (response_user.data.last_login )
        console.log(data_, '<<<<<<')
        setUltimoLogin(data_)
        
        var data_2 = new Date (response_user.data.date_joined ) 
        setEntrou(data_2)

        console.log(response.data)
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    }

    fetchAlbums();
  }, []);

  return (
    
    <section className={style.section}>

      { entrouData ? (

        <div className={style.div}>
          <>
          <Image 
            src={'/images/icon_place_holder.jpg'}
            width={250}
            height={250}
            className={style.user_image}/>
          </>
          
  
          <h1 className={style.email}>{currentUser?.email}</h1>
        
            <div>
        
              <p>Ultimo login: <u>{lastLoginData.getDate()+'/'+lastLoginData.getMonth()+'/'+lastLoginData.getFullYear()}</u> </p>
              <p>Entrou em: <u>{entrouData.getDate()+'/'+entrouData.getMonth()+'/'+entrouData.getFullYear()}</u></p>
        
            </div>
        
        </div>

      ) : (
        <p>loading...</p>
      )
      }
      

    </section>
    
  );
}