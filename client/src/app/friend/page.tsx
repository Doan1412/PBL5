import Navigation from "@/components/Navigation";
import React from "react";
import Widget from "../widget";

export default function friend() {
    return (
        <>
            <nav className="fixed z-40 w-full">
                <Navigation />
            </nav>
            <Widget>
                <main className="flex justify-center pt-3 bg-gray-100 dark:bg-medium h-screen">
                    <section className="">
                        <Sidebar />
                    </section>
                    <section
                        className="flex-1 flex flex-col max-w-3xl h-full w-screen overflow-auto"
                        style={{ scrollbarWidth: "none" }}
                    >
                        <div className="flex flex-col mainSection mt-20 ">
                            <SatatusPost
                                reff={ref}
                                isFocused={isFocused}
                                setIsFocused={setIsFocused}
                                setPosts={setPosts}
                            />
                            {loading ? (
                                <div className="mt-10">
                                    <SkeletonPost />
                                    <SkeletonPost />
                                    <SkeletonPost />
                                    <SkeletonPost />
                                    <SkeletonPost />
                                    <SkeletonPost />
                                </div>
                            ) : (
                                <div
                                    id="scrollableDiv"
                                    style={{
                                        height: 600,
                                        overflow: "auto",
                                        scrollbarWidth: "none",
                                    }}
                                >
                                    <InfiniteScroll
                                        dataLength={posts.length} // Số lượng dữ liệu hiện có
                                        next={() => {
                                            setOffset(
                                                (prevOffset) => prevOffset + 1
                                            );
                                            lazyPost();
                                        }} // Tăng offset khi kéo xuống cuối trang
                                        hasMore={true} // Bật cờ này nếu còn dữ liệu để tải thêm
                                        loader={<SkeletonPost />}
                                        endMessage={
                                            <p>Yay! You have seen it all</p>
                                        }
                                        scrollableTarget="scrollableDiv" // Đặt scrollable target cho InfiniteScroll
                                    >
                                        {posts.map(
                                            (post: PostType, index: number) => (
                                                <Post
                                                    key={index}
                                                    postData={post}
                                                    setPosts={setPosts}
                                                    hiddenComment={false}
                                                />
                                            )
                                        )}
                                    </InfiniteScroll>
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="">
                        <div className="rightSection mt-16 ">
                            <div className="requestWidget">
                                <h1 className="dark:text-white font-semibold overflow-hidden">
                                    Requests
                                </h1>
                                {requests.map(
                                    (request: FriendRequest, index: number) => {
                                        if (request.status === "PENDING") {
                                            return (
                                                <RequestWidget
                                                    request={request}
                                                    key={index}
                                                ></RequestWidget>
                                            );
                                        }
                                    }
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </Widget>
        </>
    );
}
