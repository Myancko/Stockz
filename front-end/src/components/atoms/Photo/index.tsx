import Image from 'next/image';
import { useCallback } from 'react';

interface PhotoProps {
  imageUrl: string;
  onExpandClick: () => void;
  onDeleteClick: () => void;
}

export default function Album({imageUrl, onExpandClick, onDeleteClick }: PhotoProps) {
  return (
    <section className="bg-white flex flex-col items-center justify-center w-1/6 h-1/3 gap-5 rounded">
      <Image src={imageUrl} alt="album cover" width={250} height={100} objectFit="cover" />

      <div className='flex items-center gap-7'>
        <div className='flex gap-3'>
          <button onClick={onDeleteClick}>
            <img src="/images/delete.svg" alt="button icon" width={20} height={20} />
          </button>
          <button onClick={onExpandClick}>
            <img src="/images/expand.svg" alt="button icon 2" width={20} height={20} />
          </button>
        </div>
      </div>
    </section>
  );
}