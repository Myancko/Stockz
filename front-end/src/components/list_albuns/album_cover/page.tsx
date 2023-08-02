'use client'

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link'
import style from './style.module.css'


export default function Album(props) {

  return (
    
      <Link key={props.id} href={"http://127.0.0.1:3000/album/list/"+props.id } >
        <div className={style.cover} >
          <Image
            className={style.album_cover} 
            src={'http://127.0.0.1:3001/api/google-drive?id='+props.image}
            width={275}
            height={350}
            />
  
          <div className={style.div_title}>
            <p className={style.album_title} >{props.title} </p>
          </div>
        </div>
      </Link>
    
    
    
  )
}
