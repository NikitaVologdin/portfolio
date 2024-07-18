interface props {
  className?: string;
  name: string;
  disabled?: boolean;
}

export default function FormButton({ className, name, disabled }: props) {
  const hoverClasses = "hover:text-white hover:bg-indigo-900";
  const disabledClasses = "disabled:border-gray-700 disabled:text-gray-700";
  const activeClasses = "border-indigo-900 text-indigo-900";

  return (
    <button
      className={
        disabled
          ? `border py-1 px-3 text-md rounded ${disabledClasses}`
          : `border py-1 px-3 text-md rounded ${activeClasses} ${hoverClasses} ${className}`
      }
      type="submit"
      disabled={disabled}
    >
      {name}
    </button>
  );
}
