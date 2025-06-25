import AccountEditor from "@/components/account/AccountEditor";
import Navbar from "@/components/shared/navbar/Navbar";

export default function AccountPage() {
  return (
    <div className="w-full">
      <Navbar />
      <AccountEditor />
    </div>
  );
}
