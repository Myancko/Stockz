import Sign_up_form from "@/components/cadastro/page";
import style from './style.module.css'

export default async function Cadastro() {
  
  return (
    <main className={style.main}>
        <h1 className={style.title}>Cadastro</h1>
        <p className={style.slogan}>Armazene e compartlhe suas fotos aqui :)</p>
       <Sign_up_form />
        
    </main>
  );
}