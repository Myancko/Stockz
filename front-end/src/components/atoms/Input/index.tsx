interface FormInputProps {
  placeholder: string;
  label?: string;
  background: string;
  name: string;
}

export default function Input({ placeholder, label, background, name }: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="email" className="mb-1 font-normal">
        {label}
      </label>
      <input
        className={`bg-${background} border border-black border-1 px-4 placeholder-gray-500 h-14 rounded`}
        type="text"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}