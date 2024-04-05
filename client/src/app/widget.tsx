import Popup from "@/components/Popup";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/store";
import { resetPopUp } from "./hooks/features/popup.slice";
import { resetLoading } from "./hooks/features/loading.slice";
import Loading from "@/components/Loading/Loading";

export default function Widget({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const popup = useAppSelector((state) => state.popup);
  const loading = useAppSelector((state) => state.loading.onLoading);

  useEffect(() => {
    dispatch(resetPopUp());
    dispatch(resetLoading());
  }, [dispatch]);

  return (
    <div>
      <div className="text-base text-black/90 font-normal font-sans">
        <Loading onLoading = {loading}/>
        <Popup
          text={popup.text}
          type={popup.type}
          close={() => dispatch(resetPopUp())}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}
