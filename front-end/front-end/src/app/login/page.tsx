import Login_form from '@/components/login_form/page';
import style from './style.module.css'

export default async function Form() {
  
  return (
    <main className={style.main} >
        <h1 className={style.title}>Stockz</h1>
        <p className={style.slogan}>Armazene e compartlhe suas fotos aqui :)</p>
        <Login_form/>
        
    </main>
  );
}