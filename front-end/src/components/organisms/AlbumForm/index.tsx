import React, {SyntheticEvent, useState} from "react";
import Input from '../../atoms/Input';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import axios from "@/node_modules/axios/index";

export default function AlbumForm() {

  const [title, setTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [shared_with, setSharedwith] = useState('');
  const [cover, setCover] = useState(null);
  const [photos, setImage] = useState(null);

  const data  = {
    title : title,
    discription : discription,
    owner : null,
    shared_with : [shared_with],
    cover : cover,
    photos : [photos],
    delete_on_reset_day : []

  }

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  

  const switchImage = (e) => {
    setCover(e.target.files)
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const switchImageAll = (e) => {
    setImage(e.target.files)
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      newImages.push(URL.createObjectURL(files[i]));
    }

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const imageRemove = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const create_album = async () => {
    
    const form_data = new FormData();
    form_data.append('title', title)
    form_data.append('discription', discription)
    form_data.append('shared_with', shared_with)
    form_data.append('cover', cover)
    form_data.append('photos', [photos])
    

    
    const coockie = await getCookie('access');

    console.log(data, '<<<<<<<')


    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/api/album/',
        data,
        { headers: { Authorization: 'Bearer '+coockie, 'Content-Type' : 'multipart/form-data' } }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      /* await router.push("/album/all"); */
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {

      await create_album();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col h-screen">
      <form action="http://127.0.0.1:8000/api/album/" method="post" enctype="multipart/form-data" className="flex flex-1 flex-col bg-grayhigh items-center justify-center">
        <div className="flex items-center justify-center">
          <label htmlFor="imageInput" className="cursor-pointer">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected image"
                width={500}
                height={60}
                
              />
            ) : (
              <Image
                src="/images/album_login.svg"
                alt="plus"
                width={500}
                height={60}
              />
            )}
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            className="hidden"
            name="cover" 
            onChange={switchImage}
          />
          <div className="flex flex-col">
            <input name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Escolha um nome para seu álbum" className={`bg-gray border border-black border-1 px-4 placeholder-gray-500 h-14 rounded`} />
            {/* <Input name="title" onChange={setTitle} placeholder="Escolha um nome para seu álbum" background='gray' /> */}
            <input name="discription" onChange={(e) => setDiscription(e.target.value)}  placeholder="Adicione uma descrição ao álbum" className={`bg-gray border border-black border-1 px-4 placeholder-gray-500 h-14 rounded`} />
            {/* <Input name="discription" onChange={setDiscription}  placeholder="Adicione uma descrição ao álbum" background='gray' /> */}
            <div className='flex'>
              <input placeholder="@editor" className={`bg-gray border border-black border-1 px-4 placeholder-gray-500 h-14 rounded`} />
              <input name='shared_with' onChange={(e) => setSharedwith(e.target.value)}  placeholder="@cliente" className={`bg-gray border border-black border-1 px-4 placeholder-gray-500 h-14 rounded`} />
              {/* <Input placeholder="@editor" background='gray' />
              <Input name='shared_with' onChange={setSharedwith}  placeholder="@cliente" background='gray' /> */}
            </div>
          </div>
        </div>
        <section className="flex flex-col items-center bg-grayhigh">
          <label htmlFor="imagesInput" className="cursor-pointer">
            <img src="/images/plus.svg" alt="icone mais" width={50} height={50} />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={switchImageAll}
            multiple
            name='photos'
            id="imagesInput"
            className="hidden"
          />
          <div className="flex mt-4">
            {selectedImages.map((imageURL, index) => (
              <div key={index} className="mr-4">
                <img src={imageURL} alt={`Image ${index}`} width={100} height={100} />
                <button onClick={() => imageRemove(index)} className="text-red-500">X</button>
              </div>
            ))}
          </div>
        </section>
        <button type="submit">CRIAR ÁLBUM</button>
      </form>
    </main>
  );
}