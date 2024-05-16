import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "../../hooks/store";
import { ListFriendType, PostType } from "../../types";
import { useEffect, useMemo } from "react";
import useHttp from "../../hooks/customs/useAxiosPrivate";
import { getLocalStorage } from "../localStorage_State";
import { failPopUp } from "../../hooks/features/popup.slice";

export function useListFriend(
  setFiends: React.Dispatch<React.SetStateAction<ListFriendType[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id_user?: string
) {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);

  useEffect(() => {
    async function fetchListFriend() {
      const token = getLocalStorage()?.token;
      if (!token) return;
      try {
        const response = await httpPrivate.get(
          `/friend/list/${id_user}`,
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
          const friendsData = response.data.data;
          // console.log(friendsData);
          setFiends(friendsData);
          setLoading(false);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        // console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchListFriend();
  }, [
    params,
    dispatch,
    httpPrivate,
    setFiends,
    setLoading,
    controller,
    id_user,
  ]);
}
