import AdminEditor from "@/components/AdminEditor/AdminEditor";
import Login from "@/components/Login/Login";
import { useSessionContext } from "@supabase/auth-helpers-react";

export default function Admin() {
  const { session, isLoading: isSessionLoading } = useSessionContext();

  if (!isSessionLoading) {
    if (session) {
      return <AdminEditor />;
    } else {
      return <Login />;
    }
  }
}
