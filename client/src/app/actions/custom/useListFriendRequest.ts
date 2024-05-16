import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "../../hooks/store";
import { FriendRequest } from "../../types";
import { useEffect, useMemo } from "react";
import useHttp from "../../hooks/customs/useAxiosPrivate";
import { getLocalStorage } from "../localStorage_State";
import { failPopUp } from "../../hooks/features/popup.slice";

export function useListFriendRequests(
  setFriendRequest: React.Dispatch<React.SetStateAction<FriendRequest[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);

  useEffect(() => {
    async function fetchListFriendRequest() {
      const token = getLocalStorage()?.token;
      if (!token) return;
      try {
        const response = await httpPrivate.get(
          `/friend/request`,
          // {
          //   signal: controller.signal,
          // }
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        // controller.abort();
        if (response.data.status === 200) {
          const postsData = response.data.data;
          // console.log(postsData);
          setFriendRequest(postsData);
          setLoading(false);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        // console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchListFriendRequest();
  }, [params, dispatch, httpPrivate, setFriendRequest, setLoading, controller]);
}
