interface props {
  path: string;
  children: JSX.Element;
}

export default function background({ path, children }: props) {
  return (
    <div
      className={
        "bg-contain bg-right bg-no-repeat h-full h-80 bg-cover bg-gradient-to-l flex flex-col justify-center items-center border-b border-[#e1e1e1]"
      }
      style={{
        background: `linear-gradient(90deg, #FFF 0%, #FFF 55%, rgba(255, 255, 255, .6) 130%), no-repeat 110%  45% / 55% url('${path}')`,
      }}
    >
      {children}
    </div>
  );
}
