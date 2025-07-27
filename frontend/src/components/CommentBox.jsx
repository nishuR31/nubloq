import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import avatarFallback from './avatarFallback.js'
import { Textarea } from './ui/textarea'
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
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

const CommentBox = ({ selectedBlog }) => {
    const { user } = useSelector(store => store.auth);
    
    const { comment } = useSelector(store => store.comment);
    const { blog } = useSelector(store => store.blog);
    const dispatch = useDispatch();

    const [content, setContent] = useState("");
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const getAllCommentsOfBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/v1/comment/${selectedBlog?._id}/comment/all`);
                dispatch(setComment(res.data.payload.comments));
                // console.log(res.data.payload);
                
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            }
        };
        if (selectedBlog?._id) {
            getAllCommentsOfBlog();
        }
    }, [selectedBlog?._id]);

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
                const newComment = res.data.payload.comments;
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
                const newReply = res.data.payload.comments;
                dispatch(setComment([...comment, newReply]));
                toast.success(res.data.message);
                setReplyText('');
                setActiveReplyId(null);
            }
        } catch (error) {
            console.error("Reply failed:", error);
            toast.error("Failed to reply.");
        }
    };

    const deleteComment = async (commentId) => {
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

            if (res.data.success) {
                const updated = comment.map(c =>
                    c._id === commentId ? { ...c, content: editedContent } : c
                );
                dispatch(setComment(updated));
                toast.success(res.data.message);
                setEditingCommentId(null);
                setEditedContent('');
            }
        } catch (error) {
            console.error("Edit failed:", error);
            toast.error("Failed to edit comment.");
        }
    };

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
            <div className="flex gap-4 mb-4 items-center">
                <Avatar>
                    <AvatarImage src={user?.photoUrl} />
                    <AvatarFallback>{avatarFallback(user)}</AvatarFallback>
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

            {comment?.length > 0 && (
                <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md">
                    {comment.map((item) => (
                        <div key={item._id} className="mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3 items-start">
                                    <Avatar>
                                        <AvatarImage src={item?.userId?.photoUrl} />
                                        <AvatarFallback>{avatarFallback(user)}</AvatarFallback>
                                    </Avatar>
                                    <div className="mb-2 space-y-1 md:w-[400px]">
                                        <h1 className="font-semibold">
                                            {item?.userId?.firstName} {item?.userId?.lastName}
                                            <span className="text-sm ml-2 font-light">yesterday</span>
                                        </h1>

                                        {editingCommentId === item._id ? (
                                            <>
                                                <Textarea
                                                    value={editedContent}
                                                    onChange={(e) => setEditedContent(e.target.value)}
                                                    className="mb-2 bg-gray-200 dark:bg-gray-700"
                                                />
                                                <div className="flex py-1 gap-2">
                                                    <Button size="sm" onClick={() => editCommentHandler(item._id)}>Save</Button>
                                                    <Button size="sm" variant="outline" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <p>{item.content}</p>
                                        )}

                                        <div className="flex gap-5 items-center">
                                            <div
                                                className="flex gap-1 items-center cursor-pointer"
                                                onClick={() => likeCommentHandler(item._id)}
                                            >
                                                {item.likes.includes(user._id)
                                                    ? <FaHeart fill="red" />
                                                    : <FaRegHeart />}
                                                <span>{item.numberOfLikes}</span>
                                            </div>
                                            <p onClick={() => setActiveReplyId(item._id)} className="text-sm cursor-pointer">Reply</p>
                                        </div>
                                    </div>
                                </div>

                                {user._id === item?.userId?._id && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><BsThreeDots /></DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[180px]">
                                            <DropdownMenuItem onClick={() => {
                                                setEditingCommentId(item._id);
                                                setEditedContent(item.content);
                                            }}><Edit />Edit</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500" onClick={() => deleteComment(item._id)}><Trash2 />Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>

                            {activeReplyId === item._id && (
                                <div className="flex gap-3 w-full px-10 mt-2">
                                    <Textarea
                                        placeholder="Reply here ..."
                                        className="border-2 dark:border-gray-500 bg-gray-200 dark:bg-gray-700"
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
