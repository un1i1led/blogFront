import { useState, useEffect } from 'react';

interface Category {
    _id: string;
    name: string;
    name_lowered: string;
}

interface Post {
    _id: string;
    title: string;
    body: string;
    date: Date;
    published: boolean;
    tags: Category;
}

const ArticleDetail = () => {
    const [post, setPost] = useState<Post>();

    const postId = window.location.pathname.split('/')[2];

    useEffect(() => {
        async function fetchPost() {
            await fetch(`http://localhost:3000/posts/${postId}`)
                .then(res => res.json())
                .then(res => setPost(res.post))
        }

        fetchPost();
    }, []);

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
        </div>
    )
}

export default ArticleDetail;