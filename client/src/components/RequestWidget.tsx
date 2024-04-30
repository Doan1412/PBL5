import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import { useAppDispatch } from "@/app/hooks/store";
import { FriendRequest } from "@/app/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface RequestProps {
  request: FriendRequest;
}
export default function RequestWidget({ request }: RequestProps) {
  const router = useRouter();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [responed, setResponed] = useState(false);
  const handleAccept = async () => {
    try {
      const response = await httpPrivate.post(
        `/friend/add_friend/${request?.id}`,
        {
          signal: controller.signal,
        }
      );
      controller.abort();
      if (response.data.status === 200) {
        setResponed(true);
        dispatch(successPopUp("Friend request accepted"));
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  const handleReject = async () => {
    try {
      const response = await httpPrivate.post(`/friend/reject/${request?.id}`, {
        signal: controller.signal,
      });
      controller.abort();
      if (response.data.status === 200) {
        setResponed(true);
        dispatch(successPopUp("Friend request rejected"));
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  if (responed) {
    return null;
  }
  return (
    <div className="requestProfile">
      <div className="details">
        <div className="profileImage">
          {/* <img src={"/assets/image/avatar_default.jpg"} alt="" /> */}
        </div>
        <div className="userDetails">
          <div className="name">{request.senderName}</div>
          <div className="username">@{request.senderUsername}</div>
        </div>
      </div>
      <div className="actions">
        <button className="actionBtn" onClick={() => handleAccept()}>
          Accept
        </button>
        <button className="actionBtn" onClick={() => handleReject()}>
          Reject
        </button>
      </div>
    </div>
  );
}
