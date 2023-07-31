'use client'

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link'
import style from './style.module.css'

export default function Album(props) {

  return (
    <div className={style.cover} >
      <Link key={props.id} href={"http://127.0.0.1:3000/album/list/"+props.id } >
        <Image
          className={style.album_cover} 
          src={'https://drive.google.com/uc?export=view&id='+props.image}
          width={275}
          height={350}
          />

        <div className={style.div_title}>
          <p className={style.album_title} >{props.title}</p>
        </div>
      </Link>
    </div>
    
  )
}
