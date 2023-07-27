interface ButtonProps {
  text: string;
  bgColor: string;
}

export default function Button({ text, bgColor }: ButtonProps) {
  return (
    <button
      className={`bg-${bgColor} transition-transform duration-300 transform hover:bg-${bgColor}-400 h-14 hover:scale-105 rounded font-bold`}
    >
      {text}
    </button>
  );
}