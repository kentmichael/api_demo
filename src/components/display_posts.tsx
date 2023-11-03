"use client";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

type PostType = { userId: number; id: number; title: string; body: string };

export default function DisplayPosts(props: {
  posts: PostType[];
  setPostToEdit: Dispatch<
    SetStateAction<{
      id: number;
      title: string;
      body: string;
    }>
  >;
  setPosts: Dispatch<SetStateAction<PostType[]>>;
}) {
  const { posts, setPostToEdit, setPosts } = props;

  return (
    <>
      {posts.map((post) => {
        const { id, title, body } = post;

        return (
          <div key={`${id}-${title}`}>
            <h1 style={{ fontSize: "16px" }}>{title}</h1>
            <p style={{ fontSize: "14px" }}>{body}</p>
            <button
              onClick={() =>
                setPostToEdit({
                  id,
                  title,
                  body,
                })
              }
            >
              edit
            </button>
            <button
              onClick={() =>
                axios
                  .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
                  .then((_response) =>
                    // response is always empty in this case, just filter the posts
                    setPosts((prevPosts) =>
                      prevPosts.filter((prevPost) => prevPost.id !== id)
                    )
                  )
              }
            >
              delete
            </button>
          </div>
        );
      })}
    </>
  );
}
