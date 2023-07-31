import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useState, useEffect, useCallback } from 'react';
import Album_list_component from '@/components/list_albuns/page';
import Header from '@/components/header/page';
import style from './style.module.css'

export default function Listagem_album() {


  return (
    <body className={style.body}>

      <Header   />

      <main className={style.main}>

        <h1>ok</h1>
        <Album_list_component />

      </main>
      
    </body>
    
  )
}
