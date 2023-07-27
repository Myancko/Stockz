import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Menu from '@/src/components/molecules/Menu';
import MenuL from '@/src/components/molecules/MenuL';
import Album from '@/src/components/atoms/Album';
import { useRouter } from 'next/router';
import AlbumView from '@/src/components/organisms/AlbumView/index';
import Image from 'next/image'

interface Photo {
    title : string,
    drive_id : string,
    photo : any,
    owner : 1
  }
  
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

  export default function View() {
    const router = useRouter();
    const { id } = router.query; // Get the ID from the URL
  
    const [albums, setAlbums] = useState<Album[]>([]);
  
    useEffect(() => {
      const coockie = getCookie('access');
      if (id) {
        // Make the API call only when 'id' is available
        async function fetchAlbums() {
          try {
            console.log(coockie);
            const response = await axios.get<Album[]>('http://127.0.0.1:8000/api/album/' + id, {
              headers: {
                Authorization: 'Bearer ' + coockie,
              },
            });
  
            setAlbums(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching albums:', error);
          }
        }
  
        fetchAlbums();
      }
    }, [id]); // Add 'id' as a dependency
  
    const handleDeleteAlbum = async () => {
      try {
        const coockie = getCookie('access');
        await axios.delete(`http://127.0.0.1:8000/api/album/${id}`, {
          headers: {
            Authorization: 'Bearer ' + coockie,
          },
        });
  
        // If the deletion was successful, you can redirect the user to another page, for example, the homepage.
        router.push('/album/all'); // Replace '/' with the path you want to redirect to after deleting the album.
      } catch (error) {
        console.error('Error deleting album:', error);
      }
    };
  
    const cover = () => {
      // ... (unchanged code for the cover function)
    };
  
    return (
      <main className="flex flex-col h-screen">
        <Menu />
  
        <section className="flex flex-1 bg-grayhigh items-center justify-center">
          <div>
            <h1>{albums.title}</h1>
            <p>{albums.discription}</p>
            {cover()}
            {albums.photos && albums.photos.length > 0 ? (
              albums.photos.map((img) => (
                <Image
                  key={img.drive_id}
                  src={'https://drive.google.com/uc?export=view&id=' + img.drive_id}
                  width={500}
                  height={500}
                  alt={img.title}
                />
              ))
            ) : (
              <p>No photos available</p>
            )}
  
            <button onClick={handleDeleteAlbum}>Delete Album</button>
          </div>
        </section>
      </main>
    );
  
}