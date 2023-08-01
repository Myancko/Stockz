"use client"

import Album from './album_cover/page';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link'
import style from './style.module.css'

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


export default function Album_list_component() {

  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<Album[]>([]);


  useEffect(() => {
    const coockie = getCookie('access');
    async function fetchAlbums() {
      try {
        const response = await axios.get<Album[]>('http://127.0.0.1:8000/api/album/', {
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

  const handleExpandClick = useCallback(() => {
    console.log('Álbum expandido!');
  }, []);

  const handleDeleteClick = useCallback(() => {
    console.log('Álbum deletado!');
  }, []);

  return (

    <section className={style.list_album} >
        {isLoading ? (
          <div>Loading...</div>
        ) : (

          <>
            {albums.length === 0 ? (
              <p className={style.no_album}>No albums available.</p>
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
    </section>
  );
}