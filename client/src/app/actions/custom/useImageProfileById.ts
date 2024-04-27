import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "../../hooks/store";
import { ImageType, PostType } from "../../types";
import { useEffect, useMemo } from "react";
import useHttp from "../../hooks/customs/useAxiosPrivate";
import { getLocalStorage } from "../localStorage_State";
import { failPopUp } from "../../hooks/features/popup.slice";

export function useImageProfileById(
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id_user?: string
) {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);

  useEffect(() => {
    async function fetchListPost() {
      const token = getLocalStorage()?.token;
      if (!token) return;
      try {
        const response = await httpPrivate.get(
          `/user/${id_user}/img`,
          {
            signal: controller.signal,
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        controller.abort();
        if (response.data.status === 200) {
          const imgsData = response.data.data;
          setImages(imgsData);
          setLoading(false);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        // console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchListPost();
  }, [
    params,
    dispatch,
    httpPrivate,
    setImages,
    setLoading,
    controller,
    id_user,
  ]);
}
