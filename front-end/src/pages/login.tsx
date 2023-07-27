import Form from "../components/molecules/Form";
import LoginForm from "../components/organisms/LoginForm";

export default function Login() {
  return (
    <main className="flex h-screen">

      <div className="flex-1 flex justify-center items-center">
        <img src="./images/album_login.svg" alt="album" style={{ width: '600px', height: 'auto' }} />
      </div>


      <div className="flex-1 flex-col bg-graystart flex justify-center items-center gap-20">
        <div className="w-2/5">
            <h1 className="font-bold text-4xl">Gerencie suas fotos com o nosso banco de imagens.</h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
