interface props {
  children: JSX.Element;
}
export default function Header({ children }: props) {
  return (
    <header className="border-b-1 border-light-grey z-10">{children}</header>
  );
}
