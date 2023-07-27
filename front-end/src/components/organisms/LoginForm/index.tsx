import Form from "../../molecules/Form";
import Button from "../../atoms/Button";

export default function LoginForm() {

    return (
      <div className="flex flex-col justify-center gap-2 w-2/5">
      <Form/>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://127.0.0.1:8000/google/get_redirect/&prompt=consent&response_type=code&client_id=569822372617-j0s75nccs3o8nl748eshujie1br1mr2v.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline">
        <Button text='ENTRAR COM O GOOGLE' bgColor='green'></Button>
      </a>
      <a className="text-xl">Esqueceu sua senha?</a>
      </div>
    );
  }