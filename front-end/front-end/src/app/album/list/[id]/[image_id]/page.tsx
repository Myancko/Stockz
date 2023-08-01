'use client'
 
import React, { useEffect, useState } from 'react';
import Specific_album_list_component from '@/components/list_albuns/list_album/page';
import Header from '@/components/header/page';
import style from './style.module.css'
import Specific_image from '@/components/list_albuns/list_album/list_image/page';

export default function Specific_photo() {

  const [id, setId] = useState( Number )
  const [id_album, setAlbumId] = useState( Number )

  useEffect(() => {

    const currentURL: string = window.location.href;
    console.log(currentURL);  
    var id = currentURL.split('/').slice(-1);
    var album_id = currentURL.split('/').slice(-2);
    console.log(id[0])
    setAlbumId(parseInt(album_id[0]))
    setId(parseInt(id[0]))
  }, []);

  return (
  
    <body className={style.body}>
      <Header  />
      
      {id && id_album ?  (
        <main className={style.main}>
        <Specific_image id={id} album_id={id_album} />
        </main>
      ) : (
        <main>
          <h1>Carregando .....</h1>
        </main>
      )}
      
    </body>
    
  )
}
