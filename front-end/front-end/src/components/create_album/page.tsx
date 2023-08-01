"use client"

import axios from 'axios'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import React, {SyntheticEvent, useState} from "react";
import Image from 'next/image'
import style from './style.module.css'
import { PlusCircle,  XCircle } from "lucide-react";

export default function Create_album_form() {

    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [shared_with, setSharedwith] = useState('');
    const [cover, setCover] = useState();
    const [photos, setImage] = useState([]);
    const [public_check, setPublic] = useState(''); 
    const router = useRouter();

    
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);


    const switchImage = (e) => {

        const file = e.target.files[0];

        setSelectedImage(file)

        setCover(
          {
            title : '',
            drive_id : '',
            photo : file,
            owner : 1
          }
        )
      };

    const switchImageAll = (e) => {
        const newImages = [];
        const files = e.target.files;
        const data = []
        for (let i = 0; i < files.length; i++) {

            newImages.push(URL.createObjectURL(files[i]));
            data.push({
                title : '',
                drive_id : '',
                photo : files[i],
                owner : 1
            })
          }
        console.log(typeof data, data)
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        setImage(data)
      };

    const imageRemove = (index) => {
      setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    

    async function create_album (){
      
        const coockie = await getCookie('access');
        const body = {
            title: title,
            discription: discription,
            owner: 1,
            shared_with: [
              1
            ],
            cover,
            photos: photos, 
            delete_on_reset_day: true,
            public: public_check
          }

        try {

            const response = await axios.post(
                'http://127.0.0.1:8000/api/album/',
                body,
                { headers: { Authorization: 'Bearer '+coockie, 'Content-Type' : 'multipart/form-data' } }
              )
            await router.push("/album");
        } catch (error) {
            console.error(error);
          }

    }
      

    const handleSubmit = async (e:SyntheticEvent) => {
      e.preventDefault();

      try {
        await create_album();

      } catch (error) {
        console.error(error);
      }
    };

    return (
    <main>
        
        <form className={style.form} onSubmit={handleSubmit}>

          <section className={style.upper_section}>

            <div className={style.info}>
              <label htmlFor="cover" className={style.label}>

                { selectedImage ? (

                  <>
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt="plus"
                      width={500}
                      height={500}
                    />
                  </>

                ) : (

                  <>
                    <Image
                      src="/images/place_holder.jpg"
                      alt="plus"
                      width={500}
                      height={500}
                    />
                  </>
                )}

              </label>
              <input type="file" hidden onChange={switchImage} name="cover" id="cover" />
            </div>

            <div className={style.info}>

              <input className={style.title} type="text" name='title' onChange={(e) => setTitle(e.target.value)} placeholder="Titulo" />
              <textarea className={style.discription} placeholder="Descricao" onChange={(e) => setDiscription(e.target.value)} name="discription" id="" cols="30" rows="10"></textarea>
             
              <div className={style.radio}>
                <p>Album:</p>

                <div className={style.radio}>
                  <input type="radio" name='publico' onChange={(e) => setPublic(e.target.value)} value={'true'} checked/> 
                  <p>Publico</p>
                </div>

                <div className={style.radio}>
                  <input type="radio" name='publico' onChange={(e) => setPublic(e.target.value)} value={'false'}/> 
                  <p>Privado</p>
                </div>
                
                
              </div>

              <select defaultValue={'1'} name='owner' hidden>
                <option  value="1">pew</option>
              </select>
                  
              <select name='shared_with' hidden defaultValue={['1']} multiple>
                  <option value="1">pew</option>
              </select>

            </div>

          </section>

          <section className={style.lower_half}>
                  

            <div className={style.photos}>

              <input
                type="file"
                accept="image/*"
                onChange={switchImageAll}
                multiple
                name='photos'
                id="imagesInput"
                hidden
              />

              {selectedImages.map((imageURL, index) => (

                <div key={index}  className={style.specific_imgs} >
                  <img className={style.img} src={imageURL} alt={`Image ${index}`} width={200} height={270} />

                  <button onClick={() => imageRemove(index)}>

                    <XCircle className={style.delete} size={50} color={"#ff0101"}  fill={'none'}/>

                  </button>

                </div>

              ))}

              <label htmlFor="imagesInput" className={style.add}>
                  <PlusCircle size={60} color={"white"} />
              </label>

            </div>
          </section>
            

            <select  defaultValue={'true'} name='delete_on_reset_day' hidden>
                <option value="true">sim</option>
                <option value="false">nao</option>
            </select>
          
          <div className={style.button}>
            
            <button type="submit" className={style.enviar} >enviar</button>
          
          </div>
         


        </form>       

    </main>
  )
}
