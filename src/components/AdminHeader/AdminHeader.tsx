import { useSessionContext } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import style from "./AdminHeader.module.scss";

export default function AdminHeader(): JSX.Element {
  const { supabaseClient } = useSessionContext();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className={style["admin-header"]}>
      <Link href="/admin">Admin</Link>

      <button onClick={handleSignOut}>
        Logout <FaSignOutAlt />
      </button>
    </div>
  );
}
