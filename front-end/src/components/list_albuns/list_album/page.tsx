'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Album from '@/src/components/atoms/Album';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import style from './style.module.css'
import Link from 'next/link'


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
  create_date: '';
  cover: {
    title: string;
    drive_id: string;
    photo: any;
    owner: 1;
  };
  photos: Photo[]; // Renamed to Photo[]
  delete_on_reset_day: boolean;
  public: boolean;
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
  const [currentUser, setCurrentuser] = useState<User | null>(null)
  const [data, setData] = useState( )

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

          setAlbum(response.data);
          var data_ = new Date (response.data.create_date )
          setData( data_ )

          console.log(response.data)

          const response_user = await axios.get<User>('http://127.0.0.1:8000/api/user/' + response.data.owner, {
              headers: {
                Authorization: 'Bearer ' + coockie,
              },
            });
            
          console.log(response_user.data)

          setUser(response_user.data)

          const response_current_user = await axios.get<User>('http://127.0.0.1:8000/api/user/', {
              headers: {
                Authorization: 'Bearer ' + coockie,
              },
            });

          setCurrentuser(response_current_user.data)

          
          console.log(response.data, '<<<<');
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

  console.log(user?.email)
  return (

    <section>

        {album ? ( 
          <div>

            {album.cover && user?.email ? ( 
              <section className={style.information} >

                <div className={style.cover}>
                  <Image
                    Loading=""
                    key={album.cover.drive_id}
                    src={'https://drive.google.com/uc?export=view&id=' + album.cover.drive_id}
                    quality={100}
                    width={500}
                    height={500}
                    alt={album.cover.title}
                  />
                </div >

                <div className={style.discription} >
                  <p className={style.title} >{album.title}</p>
                  <p>{album.discription}</p>
                  <div>Dono: {user.email}</div>
                  <div>
                    <p>{ 'Criado em: ' +data.getDate()+'/'+data.getMonth()+'/'+data.getFullYear()}</p>
                  </div>
                  <p>{"Publico: "+album.public}</p>
                </div>

                

              </section>

            ) : (
              <p>No cover available</p>
            )}

          
            <div className={style.photos} >
              {album.photos && album.photos.length > 0 ? (
                album.photos.map((img) => (
                  <Link href={"http://127.0.0.1:3000/album/list/" + props.id + '/' + img.id } >
                   <Image
                     key={img.drive_id}
                     src={'https://drive.google.com/uc?export=view&id=' + img.drive_id}
                     quality={100}
                     width={200}
                     height={300}
                     className={style.img}
                     alt={img.title}
                   />
                  </Link>
                ))
              ) : (
                <p>No photos available</p>
              )}
            </div>

            <div className={style.bottom}>
              
              {  user?.email == currentUser?.email ? (

                <>
                  <button className={style.delete_button} onClick={handleDeleteAlbum}>Deletar Album</button>
                  <button className={style.edit_button}>Editar</button>
                </>

              ) : (
                null
                )
              }
              
            
            </div>

          </div>
        ) : (
          <p>Loading...</p>
        )}
    </section>
  );
}
