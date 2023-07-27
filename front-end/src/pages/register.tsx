import Form from "../components/molecules/Form";
import LoginForm from "../components/organisms/LoginForm";
import RegisterForm from "../components/organisms/RegisterForm";

export default function Login() {
  return (
    <main className="flex h-screen">

      <div className="flex-1 flex justify-center items-center bg-graystart">
        <img src="./images/album_register.svg" alt="album" style={{ width: '600px', height: 'auto' }} />
      </div>


      <div className="flex-1 flex-col bg-gradient-to-r from-gray-200 to-gray-100 flex justify-center items-center gap-20">
        <div className="w-2/5">
            <h1 className="font-bold text-4xl">Crie uma conta e gerencie suas fotos com o nosso banco de imagens.</h1>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
