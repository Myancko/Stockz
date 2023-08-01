"use client"

import React, { useState, useEffect, useCallback } from 'react';
import style from './style.module.css'
import { useRouter } from "next/navigation";

export default function Nav_criar_album() {

  const router = useRouter();

  const Create_page =  () =>
  {
    router.push("http://127.0.0.1:3000/album/create")
  }

  return (

    <div className={style.button_div}>
      
      <button onClick={Create_page} className={style.criar}>Criar Álbum</button>

    </div>
  
  );
}