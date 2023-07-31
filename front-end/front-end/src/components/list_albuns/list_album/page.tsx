'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Album from '@/src/components/atoms/Album';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import style from './style.module.css'


interface Photo {
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

interface User {

  email : string

}

export default function Specific_album_list_component(props) {
  const router = useRouter();
  const { id } = props.id; // Get the ID from the URL
  console.log(id)
  const [album, setAlbum] = useState<Album | null>(null); // Change to useState<Album | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const coockie = getCookie('access');
    if (props.id) {
      // Make the API call only when 'id' is available
      async function fetchAlbum() {
        try {
          console.log(coockie);
          const response = await axios.get<Album>('http://127.0.0.1:8000/api/album/' + props.id, {
            headers: {
              Authorization: 'Bearer ' + coockie,
            },
          });

          const response_user = await axios.get('http://127.0.0.1:8000/api/user/', {
              headers: {
                Authorization: 'Bearer ' + coockie,
              },
            });
          setUser(response_user.data)
          setAlbum(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching album:', error);
          setAlbum(null); // Handle the case when the album does not exist or there is an error.
        }
      }

      fetchAlbum();
    }
  }, []);

  const handleDeleteAlbum = async () => {
    try {
      const coockie = getCookie('access');
      await axios.delete(`http://127.0.0.1:8000/api/album/${props.id}`, {
        headers: {
          Authorization: 'Bearer ' + coockie,
        },
      });

      // If the deletion was successful, you can redirect the user to another page, for example, the homepage.
      router.push('/album/list'); // Replace '/' with the path you want to redirect to after deleting the album.
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (

    <section>

        {album ? ( 
          <div>

            {album.cover && user.email ? ( 
              <section className={style.information} >

                <div className={style.cover}>
                  <Image
                    Loading=""
                    key={album.cover.drive_id}
                    src={'https://drive.google.com/uc?export=view&id=' + album.cover.drive_id}
                    width={500}
                    height={500}
                    alt={album.cover.title}
                  />
                </div >

                <div className={style.discription} >
                  <p className={style.title} >{album.title}</p>
                  <p>{album.discription} sadddddddd saddddddddd sadddddd sadddddd sadddddd sdsasasasasasasa saddd saddd sad sasasasasasasasasasasasasasa dadadadadadadadada </p>
                  <div>Dono: {user.email}</div>
                </div>

              </section>

            ) : (
              <p>No cover available</p>
            )}

          
            <div className={style.photos} >
              {album.photos && album.photos.length > 0 ? (
                album.photos.map((img) => (
                  <Image
                    key={img.drive_id}
                    src={'https://drive.google.com/uc?export=view&id=' + img.drive_id}
                    width={200}
                    height={270}
                    alt={img.title}
                  />
                ))
              ) : (
                <p>No photos available</p>
              )}
            </div>

            <div className={style.bottom}>
              <button className={style.delete_button} onClick={handleDeleteAlbum}>Delete Album</button>
            </div>

          </div>
        ) : (
          <p>Loading...</p>
        )}
    </section>
  );
}
