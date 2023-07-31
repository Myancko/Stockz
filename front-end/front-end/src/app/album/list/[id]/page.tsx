'use client'
 
import React, { useEffect, useState } from 'react';
import Specific_album_list_component from '@/components/list_albuns/list_album/page';
import Header from '@/components/header/page';

export default function Listagem_album() {
  const [id, setId] = useState(-1)
  useEffect(() => {

    const currentURL: string = window.location.href;
    console.log(currentURL);  
    var id = currentURL.split('/').slice(-1);
    console.log(id[0])
    setId(parseInt(id[0]))
  }, []);

    return (
      <body>
        
        <Header  />

        <main className="">
        <p>listagem</p>
        {id > 0 ?
        (
          <Specific_album_list_component id={id}/>
        ) :  (
          <p>gg</p>
        ) }
          
      </main>

      </body>
      
    )
}
