import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistance, parseISO, isThisWeek, format, isThisYear } from 'date-fns';
import CommentEditor from './CommentEditor';
import Comment from '../components/Comment';

interface ArticleDetailProps {
    changeToken: (value: boolean) => void;
    usrImg: string;
}

interface Category {
    _id: string;
    name: string;
    name_lowered: string;
}

interface User {
    _id: string;
    name: string;
    img: string;
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

interface Author {
    _id: string;
    name: string;
    username: string;
}

const ArticleDetail = (props: ArticleDetailProps) => {
    const [post, setPost] = useState<Post>();
    const [commentPage, setCommentPage] = useState(1);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [activeUser, setActiveUser] = useState(false);
    const [username, setUsername] = useState('');
    const [author, setAuthor] = useState<Author>();
    const [img, setImg] = useState();
    const today = new Date();
    const [isAuthor, setIsAuthor] = useState(false);

    const postId = window.location.pathname.split('/')[2];
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPost() {
            await fetch(`https://delicate-leaf-1408.fly.dev/posts/${postId}`, {
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
                        setPost(res.post);
                        setAuthor(res.post.user);
                    }

                    if (typeof res.post.img !== 'undefined') {
                        setImg(res.post.img);
                    }

                    if (res.post.user.username == res.username) {
                        setIsAuthor(true);
                    }
                })
        }

        fetchPost();
    }, []);

    useEffect(() => {
        const newComments: CommentType[] = [];

        async function fetchComments() {
            await fetch(`https://delicate-leaf-1408.fly.dev/posts/${postId}/comments?page=${commentPage}&limit=2`)
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

    const handleDelete = async () => {
        await fetch(`https://delicate-leaf-1408.fly.dev/posts/${post?._id}`, {
            method: 'DELETE'
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.error) {
                console.log(res.error)
            } else {
                navigate('/');
            }
        })
    } 

    return (
        <div className='article-detail'>
            <div className='article-title'>
                <h1>{post?.title}</h1>
            </div>
            <div className='image'>
                {img && 
                <div>
                    <img src={img} alt='' className='active-img'/>    
                </div>}
                {!img && 
                    <div className='img-placeholder'></div>
                }
                <div className='article-info'>
                    <div className='article-info-left'>
                        <Link to={`/user/${author?.username}`}>
                            <p className='info-small'>by {author?.name}</p>
                        </Link>
                        <p className='info-small'>• {post?.tags.name}</p>
                    </div>
                    {isAuthor && <p className='third' id='delete' onClick={handleDelete}>Delete Article</p>}
                </div>
            </div>
            <div className='post-body'>
                <p>{post?.body}</p>
            </div>
            <div className='comments'>
                <h3>Comments</h3>
                {activeUser ? <div className='make-comment'><div className='smallest-circle'><img src={props.usrImg} alt=''/></div><CommentEditor postId={postId} username={username} addNewComment={addNewComment}/></div> : ''}
                {comments.map((data) => <Comment comment={data} getDate={getDate} key={uuid()}/>)}
                <button className='comment-btn' onClick={changeCommentPage}>Load more comments</button>
            </div>
        </div>
    )
}

export default ArticleDetail;