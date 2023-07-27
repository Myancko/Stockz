import Menu from "@/src/components/molecules/Menu";
import MenuL from "@/src/components/molecules/MenuL";
import Photo from "@/src/components/atoms/Photo";

import React, { useCallback } from 'react';

export default function Home() {
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

        <div className="flex-1 bg-black flex flex-wrap justify-center items-center gap-10">
          <Photo
        
            imageUrl="/images/album1.jpg"
            onExpandClick={handleExpandClick}
            onDeleteClick={handleDeleteClick}
          />
          <Photo
           
            imageUrl="/images/album1.jpg"
            onExpandClick={handleExpandClick}
            onDeleteClick={handleDeleteClick}
          />
          <Photo
        
            imageUrl="/images/album1.jpg"
            onExpandClick={handleExpandClick}
            onDeleteClick={handleDeleteClick}
          />
          <Photo
            imageUrl="/images/album1.jpg"
            onExpandClick={handleExpandClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </section>
    </main>
  );
}