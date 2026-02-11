import { useRouter } from "next/navigation";

export default function useMenu() {
  const router = useRouter();

  const show = (menu: string) => {
    router.push(`/${menu}`);
  };

  return { show };
}
