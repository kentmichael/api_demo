"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateEditPost from "@/components/create_edit_post";
import DisplayPosts from "@/components/display_posts";

type PostType = { userId: number; id: number; title: string; body: string };

export default function Home() {
  // state for all the posts
  const [posts, setPosts] = useState<PostType[]>([]);
  // state for the post to edit
  const [postToEdit, setPostToEdit] = useState({
    id: 0,
    title: "",
    body: "",
  });

  // this will run once, after component mount
  useEffect(() => {
    // fetch posts, store in state (posts)
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data));
  }, []);

  return (
    <main>
      <CreateEditPost
        setOriginalPosts={setPosts}
        postToEdit={postToEdit}
        setPostToEdit={setPostToEdit}
      />
      <DisplayPosts
        posts={posts}
        setPostToEdit={setPostToEdit}
        setPosts={setPosts}
      />
    </main>
  );
}
