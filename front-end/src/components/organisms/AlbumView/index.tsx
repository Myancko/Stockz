import Image from 'next/image';
import { useState, useEffect } from 'react';

interface AlbumProps {
  albumName: string;
  desc: string;
  imagesURL: string;
}

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface PhotoListProps {
  photos: Photo[];
}

const PhotoList: React.FC<PhotoListProps> = ({ photos }) => {
  return (
    <section className="flex items-center gap-7">
      {photos.map((photo) => (
        <div key={photo.id}>
          <Image src={photo.url} alt={photo.alt} width={150} height={150} />
        </div>
      ))}
    </section>
  );
};

export default function AlbumView({ albumName, desc, imagesURL }: AlbumProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Erro ao obter as fotos do álbum:', error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <section className="bg-gray flex flex-col items-center justify-center w-1/2 h-1/2 gap-5 rounded">
      <div className="flex gap-10">
        <Image
          src={imagesURL}
          alt="album cover"
          width={250}
          height={100}
          objectFit="cover"
          className="border-2 border-white"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-white text-2xl">{albumName}</h1>
          <h3 className="text-gray-400 text-lg">{desc}</h3>
        </div>
      </div>

      <PhotoList photos={photos} />
    </section>
  );
}