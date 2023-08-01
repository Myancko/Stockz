'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import style from './style.module.css'
import Link from 'next/link'
import { ChevronsRight, ChevronsLeft, CornerDownLeft  } from "lucide-react";

interface Photo {
  id: number;
  title: string;
  drive_id: string;
  photo: any;
  owner: 1;
}

interface Album {
  id: number;
  title: string;
  discription: string;
  owner: number;
  shared_with: [];
  create_date: [];
  cover: {
    title: string;
    drive_id: string;
    photo: any;
    owner: 1;
  };
  photos: Photo[]; // Renamed to Photo[]
  delete_on_reset_day: boolean;
}


interface SpecificImageProps {
  id: number;
  album_id: number; // Renamed to album_id
}


export default function Specific_image(props: SpecificImageProps) {
  const router = useRouter();
  const { id } = props.id; // Get the ID from the URL
  const { album_id } = props.album_id; 

  console.log(id, '>>>>')

  const [album, setAlbum] = useState<Album | null>(null)
  const [img, setPhoto] = useState<Photo | null>(null); // Change to useState<Album | null>(null)
  
  useEffect(() => {
    const coockie = getCookie('access');
    if (props.id) {
      // Make the API call only when 'id' is available
      async function fetchPhoto() {
        try {

          console.log(props ,props.album_id, '<<<<<' ,props.id,  '<<<<<')

          console.log(coockie);
          const response_album = await axios.get<Album>('http://127.0.0.1:8000/api/album/' + props.album_id, {
            headers: {
              Authorization: 'Bearer ' + coockie,
            },
          });

          console.log(coockie);
          const response = await axios.get<Photo>('http://127.0.0.1:8000/api/photo/' + props.id, {
            headers: {
              Authorization: 'Bearer ' + coockie,
            },
          });
          setAlbum(response_album.data)
          setPhoto(response.data);
          console.log(response.data);
        } catch (error) {

          if (error.response.status === 404) {
            
              const currentURL: string = window.location.href;
              console.log(currentURL);  
              var id = currentURL.split('/').slice(-2);
              console.log(id[0])
              console.log(id)

              router.push("http://127.0.0.1:3000/album/list/"+props.album_id);
            }
          console.error('Error fetching Photo:', error);
          setPhoto(null); // Handle the case when the album does not exist or there is an error.
        }
      }

      fetchPhoto();
    }
  }, []);

  const next = async () => {

    const rowLen = album?.photos.length;

    album?.photos.map((img, i) => {
      if (rowLen === i + 1) {

        if (img.id == props.id) {
          router.push("http://127.0.0.1:3000/album/list/"+props.album_id)
        }
        else
        {
          router.push("http://127.0.0.1:3000/album/list/"+props.album_id+"/"+parseInt(props.id+1))
        }
        
        // last one
      } 


      console.log(img)
    })
  };

  const backwards = async () => {

    var first_id = 0

    album?.photos.map((img, i) => {
      
      
      if (i === 0) {
        first_id = img.id
        console.log(first_id, '<<<<')
      } 

      if (first_id == props.id)
      {
        console.log('dont go back')
      }
      else
      {
        router.push("http://127.0.0.1:3000/album/list/"+props.album_id+"/"+parseInt(props.id-1))
      }


      console.log(img)
    })
  };

  const return_album = async () => {

    router.push("http://127.0.0.1:3000/album/list/"+props.album_id);
      
  };

;

  return (

    <section>

        {img && album ? ( 
          <div>

            <Image  
              key={img.drive_id}
              src={'https://drive.google.com/uc?export=view&id=' + img.drive_id}
              width={1200}
              height={700}
              quality={100}
              alt={img.title}
              className={style.img}>   
            </Image>

            <div >
            
              <div className={style.nav}>

                <div className={style.move} onClick={backwards}>
                  <ChevronsLeft size={60} color={"#4B4B4B"} fill={"#4B4B4B"}/>
                </div>

                <div className={style.move} onClick={next}>
                  <ChevronsRight size={60} color={"#4B4B4B"} fill={"#4B4B4B"} />
                </div>

              </div>

              <div className={style.return} onClick={return_album}>
                  <CornerDownLeft  size={40} color={"#4B4B4B"} />
              </div>

            </div>

          </div>
        ) : (
          <div className={style.nav}>
            <p>Loading...</p>
          </div>
        )}
    </section>
  );
}
