import { UserTable } from "@/components/tables/user-table";
import { getUsersData } from "@/services/data-calls";

export default async function page() {
  const userData = await getUsersData() 
  return <><UserTable tableData={userData}/></>;
}
