import { redirect } from "next/navigation";

export default function Home() {
  redirect("/vila?ano=4");
}
