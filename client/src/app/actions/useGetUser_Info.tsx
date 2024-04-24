import { useEffect } from "react";
import { UserType } from "../types";
import http from "../utils/http";
import { useRouter } from "next/router";
import { useAppDispatch } from "../hooks/store";
import { failPopUp } from "../hooks/features/popup.slice";

export function useGetUserInfo(setUserData : React.Dispatch<React.SetStateAction<UserType | null>>) {
    const dispatch = useAppDispatch();
  //   const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function getUserInfo() {
      if (!localStorage.getItem("access_token")) return;
      const token = localStorage.getItem("access_token")?.toString();
      try {
        const response = await http.get(
          `api/v1/user/${router.query.id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (response.data.status === 200) {
          const userData = response.data.data;
          setUserData(userData);
          // setLoading(false);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        console.error("Error:", error);
        // setLoading(false);
      }
    }
    getUserInfo();
  }, [dispatch, router.query.id, setUserData]);
}
