import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { formatDistance, parseISO, isThisWeek, format, isThisYear } from 'date-fns';
import CommentEditor from './CommentEditor';
import Comment from '../components/Comment';

interface ArticleDetailProps {
    changeToken: (value: boolean) => void;
}

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

const ArticleDetail = (props: ArticleDetailProps) => {
    const [post, setPost] = useState<Post>();
    const [commentPage, setCommentPage] = useState(1);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [activeUser, setActiveUser] = useState(false);
    const [username, setUsername] = useState('');
    const today = new Date();

    const postId = window.location.pathname.split('/')[2];

    useEffect(() => {
        async function fetchPost() {
            await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (activeUser !== res.isAuth) {
                        setActiveUser(res.isAuth);
                        setUsername(res.username);
                        props.changeToken(res.isAuth);
                    }

                    if (setPost.length <= 1) {
                        setPost(res.post)
                    }
                })
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

    const addNewComment = (comment: CommentType) => {
        const newComments: CommentType[] = [];
        newComments.push(comment);
        setComments([...newComments, ...comments])
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
                {activeUser ? <div className='make-comment'><div className='comment-img'></div><CommentEditor postId={postId} username={username} addNewComment={addNewComment}/></div> : ''}
                {comments.map((data) => <Comment comment={data} getDate={getDate} key={uuid()}/>)}
                <button className='comment-btn' onClick={changeCommentPage}>Load more comments</button>
            </div>
        </div>
    )
}

export default ArticleDetail;