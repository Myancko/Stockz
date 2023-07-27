import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Menu from '@/src/components/molecules/Menu';
import MenuL from '@/src/components/molecules/MenuL';
import Album from '@/src/components/atoms/Album';


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
    <main className="flex flex-col h-screen">
      <Menu />

      <section className="flex flex-1">
        <MenuL />

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex-1 bg-black flex flex-wrap justify-center items-center gap-10">
            {albums.map((album) => (
              <a href={"http://127.0.0.1:3000/album/get/"+album.id}>
                <Album
                  key={album.id}
                  albumName={album.title}
                  imageUrl={'https://drive.google.com/uc?export=view&id='+album.cover.drive_id} // Assuming `cover` is the URL of the album cover image
                  onExpandClick={handleExpandClick}
                  onDeleteClick={handleDeleteClick}
                />
              </a>
            ))}

          </div>
        )}
      </section>
    </main>
  );
}