import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

export default function RegisterForm() {
    return (
      <div className="flex flex-col justify-center gap-2 w-2/5">
        <form>
          <Input placeholder="Digite seu nome completo..." label='Nome' background='gray-200'/>
          <Input placeholder="Digite um e-mail válido..." label='E-mail' background='gray-200'/>
          <Input placeholder="Digite uma senha forte..." label='Senha' background='gray-200' />
          <Input placeholder="Digite sua senha novamente..." label='Confirme sua senha' background='gray-200' />
          <Button text='Criar uma conta' bgColor='green'></Button>
        </form>

        <Button text='Criar uma conta com o Google' bgColor='green'></Button>

      </div>
    );
  }