"use client"

import axios from 'axios'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import React, {SyntheticEvent, useState} from "react";

export default function Create_album_form() {

    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const [shared_with, setSharedwith] = useState('');
    const [cover, setCover] = useState();
    const [photos, setImage] = useState([]);  
    const router = useRouter();

    const switchImage = (e) => {

        const file = e.target.files[0];

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
        const files = e.target.files;
        const data = []
        for (let i = 0; i < files.length; i++) {
            
            data.push({
                title : '',
                drive_id : '',
                photo : files[i],
                owner : 1
            })
          }
        console.log(typeof data, data)
        setImage(data)
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
            delete_on_reset_day: true
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
        
        <form onSubmit={handleSubmit}>
            
            <input type="text" name='title' onChange={(e) => setTitle(e.target.value)} placeholder="Titulo" />

            <textarea placeholder="Descricao" onChange={(e) => setDiscription(e.target.value)} name="discription" id="" cols="30" rows="10"></textarea>
            
            <select defaultValue={'1'} name='owner' hidden>
                <option  value="1">pew</option>
            </select>
            
            <select name='shared_with' defaultValue={['1']} multiple>
                <option value="1">pew</option>
            </select>
            

            <input type="file" onChange={switchImage} name="cover" id="" />
            <input type="file" onChange={switchImageAll} name="photos" multiple/>

            <select  defaultValue={'true'} name='delete_on_reset_day' hidden>
                <option value="true">sim</option>
                <option value="false">nao</option>
            </select>
           
            <button type="submit">enviar</button>


        </form>       

    </main>
  )
}
