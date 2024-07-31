interface props {
  path: string;
  children: JSX.Element;
}

export default function background({ path, children }: props) {
  return (
    <div
      className={
        "h-[350px] bg-cover bg-gradient-to-l border-b border-[#e1e1e1]"
      }
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(90deg, #FFF 0%, #FFF 55%, rgba(255, 255, 255, .6) 130%), url("${path}")`,
        backgroundPosition: "right",
      }}
    >
      {children}
    </div>
  );
}
