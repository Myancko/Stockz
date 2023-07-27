import Image from 'next/image';

export default function Menu() {
  return (
    <nav className="h-screen bg-gray flex flex-col items-center top-0 left-0 w-20 gap-10 pt-10">
      <a href="/user/home">
        <Image src="/images/home.svg" alt="home" width={50} height={60} />
      </a>

      <hr className="w-12 border border-white border-dashed my-2" />

      <a href="/album/add">
        <Image src="/images/plus.svg" alt="plus" width={50} height={60} />
      </a>
    </nav>
  );
}