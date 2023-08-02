"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { getCookie } from 'cookies-next';
import Image from 'next/image'
import axios from 'axios'
import style from './style.module.css'
import { useRouter } from "next/navigation";
import Link from 'next/link'

interface Album {
    id : number,
    email : string,
    user_photo : string
}


export default function UserBlock() {
    const [user_data, setUser] = useState<Album | null>(null)
    const router = useRouter();

    useEffect(() => {
        const coockie = getCookie('access');

        async function fetchAlbums() {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/', {
              headers: {
                Authorization: 'Bearer ' + coockie,
              },
            });

            console.log(response.data, '<<<<')
            setUser((response.data))    
    

          } catch (error) {
            if (error.response.status === 401) {
              router.push("http://127.0.0.1:3000/login");
            }
            console.error('Error fetching albums:', error);

          }
        }
    
        fetchAlbums();
      }, []);

    return (
      <div className={style.user_block}>
        { user_data ? (
            
            <>
              <Link className={style.user_block} href='/user'>
                  <Image 
                  src={'/images/icon_place_holder.jpg'}
                  width={50}
                  height={50}
                  className={style.user_image}/>
                  <p className={style.user_email}>{user_data.email}</p>
              </Link>
            </>
            
        ) : (
            <div>funfa...</div>
        )}
      </div>
    )
  }
  

  