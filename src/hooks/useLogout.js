import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authSore";

const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut();
      logoutUser();
      localStorage.removeItem("user-info");
    } catch (error) {
      showToast("Error", error.massage, "error");
    }
  };
  return { handleLogout, isLoggingOut, error };
};

export default useLogout;