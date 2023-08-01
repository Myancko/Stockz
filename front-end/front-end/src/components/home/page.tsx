"use client"

import axios from 'axios'
import Image from 'next/image'
import { cookies } from 'next/headers'
import style from './style.module.css'
import { getCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import Album from '../list_albuns/album_cover/page'
import React, {SyntheticEvent, useState, useEffect} from "react";


interface Album {
  id: number,
  title: string,
  discription: string,
  owner: number,
  shared_with: [],
  create_date: [],
  cover: {title : string,
    drive_id : string,
    photo : any,
    owner : 1},
  photos: [{title : string,
           drive_id : string,
           photo : any,
           owner : 1}],
  delete_on_reset_day: boolean,
}


export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  
  useEffect(() => {
    const coockie = getCookie('access');
    async function fetchAlbums() {
      try {
        const response = await axios.get<Album[]>('http://127.0.0.1:8000/api/public_album/', {
          headers: {
            Authorization: 'Bearer ' + coockie,
          },
        });

        setAlbums(response.data);
        setIsLoading(false);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching albums:', error);
        setIsLoading(false);
      }
    }

    fetchAlbums();
  }, []);

    return (

     <section >
      <h1 className={style.title}>Coleções Públicas</h1>

      <div className={style.list_album}>

        {isLoading ? (
            <div>Loading...</div>
          ) : (

            <>
              {albums.length === 0 ? (
                <p>No albums available.</p>
              ) : (
              albums.map((album) => (

                album.cover && album.photos && album.photos.length > 0 ? (

                  <Album image={album.cover.drive_id} title={album.title} id={album.id} />

                ) : (
                  null
                )
                
              ))
            )}
            </>
          )}

      </div>

     </section>

  )
}
