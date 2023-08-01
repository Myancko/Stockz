import Header from "@/components/header/page"
import Home from "@/components/home/page"
import style from './style.module.css'

export default function Listagem_album() {
  return (

    <body className={style.body}>
      
      <Header />

      <main className={style.main}>

        <Home />

      </main>

    </body>
    
  )
}
