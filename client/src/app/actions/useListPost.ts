import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "../hooks/store";
import { PostType } from "../types";
import { useEffect } from "react";
import useHttp from "../hooks/customs/useAxiosPrivate";
import { getLocalStorage } from "./localStorage_State";
import { failPopUp } from "../hooks/features/popup.slice";

export function useListPost(
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const httpPrivate = useHttp();

  useEffect(() => {
    async function fetchListPost() {
      const token = getLocalStorage()?.token;
      if (!token) return;
      try {
        const response = await httpPrivate.get(
          `/post/homepage?skip=0&limit=20`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        if (response.data.status === 200) {
          const postsData = response.data.data;
          console.log(postsData);
          setPosts(postsData);
          setLoading(false);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchListPost();
  }, [params, dispatch, httpPrivate, setPosts, setLoading]);
}
