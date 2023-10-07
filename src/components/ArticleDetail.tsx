import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { formatDistance, parseISO, isThisWeek, format, isThisYear } from 'date-fns';
import Comment from '../components/Comment';

interface Category {
    _id: string;
    name: string;
    name_lowered: string;
}

interface User {
    _id: string;
    name: string;
}

interface Post {
    _id: string;
    title: string;
    body: string;
    date: Date;
    published: boolean;
    tags: Category;
}

interface CommentType {
    _id: string;
    user: User;
    post: string;
    body: string;
    date: Date;
}

const ArticleDetail = () => {
    const [post, setPost] = useState<Post>();
    const [commentPage, setCommentPage] = useState(1);
    const [comments, setComments] = useState<CommentType[]>([]);
    const today = new Date();

    const postId = window.location.pathname.split('/')[2];

    useEffect(() => {
        async function fetchPost() {
            await fetch(`http://localhost:3000/posts/${postId}`)
                .then(res => res.json())
                .then(res => setPost(res.post))
        }

        fetchPost();
    }, []);

    useEffect(() => {
        const newComments: CommentType[] = [];

        async function fetchComments() {
            await fetch(`http://localhost:3000/posts/${postId}/comments?page=${commentPage}&limit=2`)
                .then(res => res.json())
                .then(res => res.results.map((data: CommentType) => { newComments.push(data)}))

            setComments([...comments, ...newComments])
        }

        fetchComments();
    }, [commentPage])

    const changeCommentPage = () => {
        setCommentPage(commentPage + 1);
    }

    const getDate = (date: string) => {
        const postDate = parseISO(date);

        if (isThisWeek(postDate)) {
            return `${formatDistance(today, postDate)} ago`;
        } else if (!isThisYear(postDate)) {
            return `${format(postDate, 'MM/dd/yyyy')}`;
        } else {
            return `${format(postDate, 'MMM dd')}`;
        }
    }

    return (
        <div className='article-detail'>
            <div className='article-title'>
                <h1>{post?.title}</h1>
            </div>
            <div className='image'>
                <div className='img-placeholder'></div>
            </div>
            <div className='post-body'>
                <p>{post?.body}</p>
            </div>
            <div className='comments'>
                <h3>Comments</h3>
                {comments.map((data) => <Comment comment={data} getDate={getDate} key={uuid()}/>)}
                <button className='comment-btn' onClick={changeCommentPage}>Load more comments</button>
            </div>
        </div>
    )
}

export default ArticleDetail;