"use client";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type CreateEditPostPropsType = {
  setOriginalPosts: Dispatch<SetStateAction<PostType[]>>;
  postToEdit: {
    id: number;
    title: string;
    body: string;
  };
  setPostToEdit: Dispatch<
    SetStateAction<{
      id: number;
      title: string;
      body: string;
    }>
  >;
};

export default function CreateEditPost(props: CreateEditPostPropsType) {
  const { setOriginalPosts, postToEdit, setPostToEdit } = props;
  // state for the input fields (title & body)
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const handleChange = (event: any) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // if postToEdit id is true, send put request, else post
    postToEdit.id
      ? axios
          .put(`https://jsonplaceholder.typicode.com/posts/${postToEdit.id}`, {
            title: post.title,
            body: post.body,
            userId: 1,
          })
          .then((response) =>
            setOriginalPosts((prevPosts) =>
              prevPosts.map((post) =>
                post.id === response.data.id ? response.data : post
              )
            )
          )
      : axios
          .post("https://jsonplaceholder.typicode.com/posts", {
            title: post.title,
            body: post.body,
            userId: 1,
          })
          .then((response) => {
            setOriginalPosts((prevPosts) => [...prevPosts, response.data]);
          });
  };

  // this will run everytime postToEdit state changes
  // postToEdit state changes when
  // 1. a post edit button is clicked
  // 2. reset button is clicked
  useEffect(() => {
    // if postToEdit.id is true (1 to +infinite in this case)
    // run setPost to set the default value of the input fields (title and body) to the selected post to edit
    if (postToEdit.id) {
      setPost({
        title: postToEdit.title,
        body: postToEdit.body,
      });
    }
  }, [postToEdit]);

  return (
    <form onSubmit={handleSubmit}>
      <input value={post.title} name="title" onChange={handleChange} />
      <input value={post.body} name="body" onChange={handleChange} />
      <button type="submit"> {postToEdit.id ? "update" : "add"}</button>
      <button
        type="reset"
        onClick={() => {
          setPost({
            title: "",
            body: "",
          });
          setPostToEdit({
            id: 0,
            title: "",
            body: "",
          });
        }}
      >
        reset
      </button>
    </form>
  );
}
