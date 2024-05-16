import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "../../hooks/store";
import { PostType, SharePostType } from "../../types";
import { useEffect, useMemo } from "react";
import useHttp from "../../hooks/customs/useAxiosPrivate";
import { getLocalStorage } from "../localStorage_State";
import { failPopUp } from "../../hooks/features/popup.slice";

export function useListPostShareOfUser(
  setSharePosts: React.Dispatch<React.SetStateAction<SharePostType[]>>,
  setOriginPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id_user?: string
) {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);

  useEffect(() => {
    async function fetchListPostShare() {
      const token = getLocalStorage()?.token;
      if (!token) return;
      try {
        const response = await httpPrivate.get(
          `/post/share/user/${id_user}`,
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
          const originPostsData = response.data.data.originalPost;
          // console.log(postsData);
          setSharePosts(postsData);
          setOriginPosts(originPostsData);
          setLoading(false);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        // console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchListPostShare();
  }, [
    params,
    dispatch,
    httpPrivate,
    setSharePosts,
    setLoading,
    controller,
    setOriginPosts,
    id_user,
  ]);
}
