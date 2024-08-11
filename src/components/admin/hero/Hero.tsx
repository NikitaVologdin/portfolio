import { IFetchedDeveloper } from "@/types/Developer";
import NewHeroForm from "@/components/admin/hero/NewHeroForm";

interface props {
  developer: IFetchedDeveloper;
  path: string;
}
export default function Hero({ developer, path }: props) {
  return <NewHeroForm developer={developer} path={path} />;
}
