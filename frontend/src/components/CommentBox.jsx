import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import avatarFallback from './avatarFallback.js';
import { Textarea } from './ui/textarea';
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setBlog } from '@/redux/blogSlice';
import { setComment } from '@/redux/commentSlice';
import { Edit, Trash2 } from 'lucide-react';
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const CommentBox = ({ selectedBlog }) => {
  const { user } = useSelector(state => state.auth);
  const { comment } = useSelector(state => state.comment);
  const { blog } = useSelector(state => state.blog);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  // ✅ Fetch comments on blog change
  useEffect(() => {
    const getAllCommentsOfBlog = async () => {
      if (!selectedBlog?._id) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/comment/${selectedBlog._id}/comment/all`);
        dispatch(setComment(res.data.payload.comments));
        toast.success("Comments fetched successfully.");
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        toast.error("Failed to fetch comments");
      }
    };

    getAllCommentsOfBlog();
  }, [selectedBlog?._id, dispatch]);

  // ✅ Create new comment
  const commentHandler = async () => {
    if (!content.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/comment/${selectedBlog._id}/create`,
        { content },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const newComment = res.data.payload.comment;
        dispatch(setComment([...comment, newComment]));

        const updatedBlogData = blog.map(p =>
          p._id === selectedBlog._id ? { ...p, comments: [...comment, newComment] } : p
        );
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
        setContent("");
      }
    } catch (error) {
      console.error("Comment failed:", error);
      toast.error("Failed to post comment.");
    }
  };

  // ✅ Reply to comment
  const replyHandler = async (parentCommentId) => {
    if (!replyText.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/comment/${selectedBlog._id}/create`,
        { content: replyText, parentCommentId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setComment([...comment, res.data.payload.comment]));
        toast.success(res.data.message);
        setReplyText('');
        setActiveReplyId(null);
      }
    } catch (error) {
      console.error("Reply failed:", error);
      toast.error("Failed to reply.");
    }
  };

  // ✅ Delete comment
  const deleteCommentHandler = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/comment/${commentId}/delete`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const filtered = comment.filter(c => c._id !== commentId);
        dispatch(setComment(filtered));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete comment.");
    }
  };

  // ✅ Edit comment
  const editCommentHandler = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/comment/${commentId}/edit`,
        { content: editedContent },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        const updated = comment.map(c =>
          c._id === commentId ? res.data.payload.comment : c
        );
        dispatch(setComment(updated));
        toast.success(res.data.message);
        setEditingCommentId(null);
        setEditedContent('');
      } else {
        toast.error(res.data?.message || "Failed to edit comment");
      }
    } catch (error) {
      console.error("Edit failed:", error);
      toast.error("Something went wrong while editing comment.");
    }
  };

  // ✅ Like handler
  const likeCommentHandler = async (commentId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/comment/${commentId}/like`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updated = res.data.payload.comment;
        const updatedList = comment.map(c =>
          c._id === commentId ? updated : c
        );
        dispatch(setComment(updatedList));
      }
    } catch (error) {
      console.error("Like failed:", error);
      toast.error("Failed to like comment.");
    }
  };

  return (
    <div>
      {/* Top input box */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar>
          <AvatarImage src={user?.photoUrl || `https://placehold.co/700x400?text=${blog.title}`} />
          <AvatarFallback>{avatarFallback({ user })}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">{user?.firstName} {user?.lastName}</h3>
      </div>

      <div className="flex gap-3">
        <Textarea
          placeholder="Leave a comment"
          className="bg-gray-100 dark:bg-gray-800"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <Button onClick={commentHandler}><LuSend /></Button>
      </div>

      {/* Comments section */}
      {Array.isArray(comment) && comment.length > 0 && (
        <div className="p-5 bg-gray-100 rounded-md mt-7 dark:bg-gray-800">
          {comment.map((item) => (
            <div key={item._id} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={item?.userId?.photoUrl || `https://placehold.co/700x400?text=${blog.title}`} />
                    <AvatarFallback>{avatarFallback({ user })}</AvatarFallback>
                  </Avatar>
                  <div className="mb-2 space-y-1 md:w-[400px]">
                    <h1 className="font-semibold">
                      {item?.userId?.firstName} {item?.userId?.lastName}
                    </h1>

                    {editingCommentId === item._id ? (
                      <>
                        <Textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="mb-2 bg-gray-200 dark:bg-gray-700"
                        />
                        <div className="flex gap-2 py-1">
                          <Button size="sm" onClick={() => editCommentHandler(item._id)}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                        </div>
                      </>
                    ) : (
                      <p>{item.content}</p>
                    )}

                    <div className="flex items-center gap-5">
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => likeCommentHandler(item._id)}
                      >
                        {item.likes?.includes(user?._id)
                          ? <FaHeart fill="red" />
                          : <FaRegHeart />}
                        <span>{item.numberOfLikes}</span>
                      </div>
                      <p onClick={() => setActiveReplyId(item._id)} className="text-sm cursor-pointer">Reply</p>
                    </div>
                  </div>
                </div>

                {/* Edit/Delete dropdown */}
                {user?._id === item?.userId?._id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger><BsThreeDots /></DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[180px]">
                      <DropdownMenuItem onClick={() => {
                        setEditingCommentId(item._id);
                        setEditedContent(item.content);
                      }}><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteCommentHandler(item._id)}
                        className="text-red-500"
                      ><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Reply box */}
              {activeReplyId === item._id && (
                <div className="flex w-full gap-3 px-10 mt-2">
                  <Textarea
                    placeholder="Reply here ..."
                    className="bg-gray-200 border-2 dark:border-gray-500 dark:bg-gray-700"
                    onChange={(e) => setReplyText(e.target.value)}
                    value={replyText}
                  />
                  <Button onClick={() => replyHandler(item._id)}><LuSend /></Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
