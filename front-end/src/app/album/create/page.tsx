import Create_album_form from '@/components/create_album/page';
import Header from '@/components/header/page';
import style from './style.module.css'

export default function Create_album() {

    return (
    <body className={style.body}>

      <Header/>

      <main className={style.main}>
        <Create_album_form /> 
      </main>
        
    </body>
  )
}
