"use client"

import UserBlock from "./user/page"
import style from './style.module.css'
import Link from 'next/link'
import axios from 'axios'
import { getCookie, deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

export default function Header() {

    const router = useRouter();
    

    const Logout = async () => {
      const coockie = await getCookie('access');

      try {
        
        const response = await axios.post('http://127.0.0.1:8000/user/logout/', {
          headers: {
            Authorization: 'Bearer ' + coockie,
          },
        });
        
        
        setCookie('access', '')
        
      } catch (error) {

        console.error(error, '<<<');
      }
      router.push("http://127.0.0.1:3000/login");
    };

    return (
      <header className={style.header} >
        <Link href="/album">
          <h1  className={style.blue_hover}>Stockz</h1>
        </Link>
    
        <ul className={style.middle_navegation}>
          <li>
            <Link className={style.blue_hover} href="/album/list" > Meus Albuns </Link>
            </li>
          {/* <li className={style.blue_hover} >Artistas</li> */}
        </ul>

        <ul className={style.right_navegation}>
          {/* <li>Favoritos</li> */}
          <li><UserBlock /></li>
          <li className={style.logout} onClick={Logout} >Log out</li>
        </ul>
        
      </header>
    )
  }
  