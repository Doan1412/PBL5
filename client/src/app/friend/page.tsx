"use client";
import Navigation from "@/components/Navigation";
import React, { useEffect, useMemo, useState } from "react";
import Widget from "../widget";
import Sidebar from "@/components/Sidebar";
import { FriendRequest, ListFriendType, UserType } from "../types";
import { useAppDispatch } from "../hooks/store";
import { useSearchParams } from "next/navigation";
import useHttp from "../hooks/customs/useAxiosPrivate";
import { getLocalStorage } from "../actions/localStorage_State";
import { setLoading } from "../hooks/features/loading.slice";
import { failPopUp } from "../hooks/features/popup.slice";
import FriendCard from "@/components/FriendCard";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import RequestWidget from "@/components/RequestWidget";
import SendedRequestWidget from "@/components/SendedRequestWidget";
import { useListSendedFriendReq } from "../actions/custom/useListSendedFriendReq";

interface Location {
    latitude: number;
    longitude: number;
}
export default function Friend() {
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const [selected, setSelected] = React.useState("photos");
    const [suggestFriend, setSuggestFriend] = useState<ListFriendType[] | null>(
        null
    );
    const [nearbyFriend, setNearbyFriend] = useState<ListFriendType[] | null>(
        null
    );
    const dispatch = useAppDispatch();
    const params = useSearchParams();
    const httpPrivate = useHttp();
    const controller = useMemo(() => new AbortController(), []);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<Location>();
    useListSendedFriendReq(setRequests, setLoading);
    const fetchApiData = async ({ latitude, longitude }: Location) => {
        try {
            const response = await httpPrivate.post(
                `/friend/nearby`,
                {
                    latitude,
                    longitude,
                },
                {
                    signal: controller.signal,
                }
            );
            controller.abort();
            if (response.data.status === 200) {
                const postsData = response.data;
                setNearbyFriend(postsData.data);
                setLoading(false);
            } else {
                dispatch(failPopUp(response.data.message));
            }
        } catch (error) {
            // console.error("Error:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);

    useEffect(() => {
        // Fetch data from API if `location` object is set
        if (location) {
            fetchApiData(location);
        }
    }, [location]);
    useEffect(() => {
        async function fetchListPost() {
            const token = getLocalStorage()?.token;
            if (!token) return;
            try {
                const response = await httpPrivate.get(
                    `/friend/list/77916988-3984-424f-95eb-64c866a45a82`,
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
                    const postsData = response.data;
                    console.log(postsData);
                    setSuggestFriend(postsData.data);
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
    }, [params, dispatch, httpPrivate, setSuggestFriend, controller]);
    return (
        <>
            <nav className="fixed z-40 w-full">
                <Navigation />
            </nav>
            <Widget>
                <main className="flex pt-3 bg-gray-100 dark:bg-medium h-screen gap-10">
                    <section className="flex ml-3">
                        <Sidebar />
                    </section>
                    <section
                        className="flex flex-col overflow-auto"
                        style={{ scrollbarWidth: "none" }}
                    >
                        <Tabs
                            size="lg"
                            className="ml-5 mt-20 "
                            aria-label="Options"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            <Tab key="suggest" title="Suggest">
                                <div className="flex flex-wrap gap-6 w-full flex-1 p-4 overflow-auto ml-10">
                                    {suggestFriend?.map(
                                        (
                                            user: ListFriendType,
                                            index: number
                                        ) => {
                                            return (
                                                <FriendCard
                                                    key={index} // Make sure to include a unique key when iterating over arrays in React
                                                    id={user.id}
                                                    avatar={
                                                        user.avatar_url as string
                                                    }
                                                    fullname={user.fullname}
                                                    username={user.username}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </Tab>
                            <Tab key="nearby" title="Nearby">
                                <div className="flex flex-wrap gap-6 w-full flex-1 p-4 overflow-auto ml-10">
                                    {nearbyFriend?.map(
                                        (
                                            user: ListFriendType,
                                            index: number
                                        ) => {
                                            return (
                                                <FriendCard
                                                    key={index} // Make sure to include a unique key when iterating over arrays in React
                                                    id={user.id}
                                                    avatar={
                                                        user.avatar_url as string
                                                    }
                                                    fullname={user.fullname}
                                                    username={user.username}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </Tab>
                            <Tab key="req" title="Friend request">
                                <div className="flex flex-wrap gap-6 w-full flex-1 p-4 overflow-auto ml-10">
                                    {requests.map(
                                        (
                                            request: FriendRequest,
                                            index: number
                                        ) => {
                                            return (
                                                <SendedRequestWidget
                                                    request={request}
                                                    key={index}
                                                ></SendedRequestWidget>
                                            );
                                        }
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    </section>
                </main>
            </Widget>
        </>
    );
}
