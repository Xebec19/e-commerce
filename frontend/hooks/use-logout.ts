import { removeAuth } from "@/store/auth.slice";
import { useDispatch } from "react-redux";

/**
 * @description: it is the central service to manage flow of logout
 */
export default function useLogout() {
  const dispatch = useDispatch();

  function handleLogout() {
    if (typeof window != "undefined") {
      localStorage.removeItem("token");
    }

    dispatch(removeAuth());
  }

  return handleLogout;
}
