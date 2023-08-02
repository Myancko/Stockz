import Header from '@/components/header/page';
import style from './style.module.css'
import Image from 'next/image'
import Link from 'next/link'
import User_data from '@/components/user/page';

export default async function Form() {
  
  return (

    <body>
      
      <Header />

      <main className={style.main} >

      <User_data/>

      </main>

    </body>
    
  );
}