interface props {
  className?: string;
  name: string;
  isFormValid: boolean;
  isSubmitting: boolean;
}

export default function FormButton({
  className,
  name,
  isFormValid,
  isSubmitting,
}: props) {
  const hoverClasses = "hover:text-white hover:bg-indigo-900";
  const disabledClasses =
    "disabled:border-gray-700 disabled:text-gray-700 disabled:opacity-50";
  const activeClasses = "border-indigo-900 text-indigo-900";

  return (
    <button
      className={`border py-1 px-3 text-md rounded ${activeClasses} ${hoverClasses} ${disabledClasses} ${className}`}
      type="submit"
      disabled={!isFormValid}
    >
      {isSubmitting ? name + "ing..." : name}
    </button>
  );
}
