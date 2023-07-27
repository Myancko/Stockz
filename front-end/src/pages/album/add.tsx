import { useState } from 'react';
import Menu from "@/src/components/molecules/Menu";
import AlbumForm from '@/src/components/organisms/AlbumForm';


export default function Add() {
  return (
    <main className="flex flex-col h-screen">
        <Menu />
        <AlbumForm/>
    </main>
  );
}