import { useState } from 'react';
import  Menu from '@/src/components/molecules/Menu/index';
import AlbumView from '@/src/components/organisms/AlbumView/index';

export default function View() {
  return (
    <main className="flex flex-col h-screen">
      <Menu />
      <section className="flex flex-1 bg-grayhigh items-center justify-center">
        <AlbumView imagesURL="/" albumName="michael" desc="michael michaelmichaelmichaelmichael" />
      </section>
    </main>
  );
}