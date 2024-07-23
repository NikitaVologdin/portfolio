"use client";
interface props {
  error: Error;
}
export default function Error({ error }: props) {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <h3 className="font-bold text-xl">An error occured!</h3>
      <p>Internal server error. Please try again later.</p>
    </div>
  );
}
