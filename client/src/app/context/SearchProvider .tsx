"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import useHttp from "../hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "../hooks/store";
import { ListFriendType, PostType } from "../types";
import { failPopUp } from "../hooks/features/popup.slice";

interface PostAttachment {
  url: string;
  type: string;
}
interface Search {
  query: string;
  type: string;
}
interface SearchFunctionsContextType {
  searchPost: (search: Search) => Promise<void>;
  searchUser: (searchValue: string) => Promise<void>;
}

interface SearchValueContextType {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  imagePost: PostAttachment | undefined;
  setImagePost: React.Dispatch<
    React.SetStateAction<PostAttachment | undefined>
  >;
  friends: ListFriendType[];
  setFriends: React.Dispatch<React.SetStateAction<ListFriendType[]>>;
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  loading: boolean;
}

const SearchFunctionsContext = createContext<SearchFunctionsContextType>({
  searchPost: async () => {},
  searchUser: async () => {},
});

const SearchValueContext = createContext<SearchValueContextType>({
  searchValue: "",
  setSearchValue: () => {},
  imagePost: undefined,
  setImagePost: () => {},
  friends: [],
  setFriends: () => {},
  posts: [],
  setPosts: () => {},
  loading: true,
});

export const useSearchFunctions = () => useContext(SearchFunctionsContext);
export const useSearchValue = () => useContext(SearchValueContext);

interface Search {
  query: string;
  type: string;
}
export const SearchFunctionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [imagePost, setImagePost] = useState<PostAttachment>();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [friends, setFriends] = useState<ListFriendType[]>([]);
  const [loading, setLoading] = useState(true);

  const searchPost = async (search: Search) => {
    if (!localStorage.getItem("access_token")) return;
    const token = localStorage.getItem("access_token")?.toString();
    try {
      const response = await httpPrivate.get(
        `/post/search?type=${search?.type}&query=${search?.query}`,
        {
          signal: controller.signal,
        }
      );
      if (response.data.status === 200) {
        const posts = response.data.data;
        setPosts(posts);
        setLoading(false);
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      // console.error("Error:", error);
      // setLoading(false);
    }
  };

  const searchUser = async (searchValue: string) => {
    // getComment post
    if (!localStorage.getItem("access_token")) return;
    const token = localStorage.getItem("access_token")?.toString();
    try {
      const response = await httpPrivate.get(
        `/user/search?query=${encodeURIComponent(searchValue)}`,
        {
          signal: controller.signal,
        }
      );
      if (response.data.status === 200) {
        const posts = response.data.data;
        setFriends(posts);
        setLoading(false);
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      // console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <SearchFunctionsContext.Provider value={{ searchPost, searchUser }}>
      <SearchValueContext.Provider
        value={{
          searchValue,
          setSearchValue,
          imagePost,
          setImagePost,
          friends,
          setFriends,
          posts,
          setPosts,
          loading
        }}
      >
        {children}
      </SearchValueContext.Provider>
    </SearchFunctionsContext.Provider>
  );
};
