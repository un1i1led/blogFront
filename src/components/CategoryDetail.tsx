import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom' ;
import { v4 as uuid } from 'uuid';
import PostItem from './PostItem';

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
    img: string;
}

const CategoryDetail = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState(1);
    const categoryId = useParams().categoryid;

    useEffect(() => {
        const newPosts: Post[] = [];

        const fetchPosts = async () =>{
            await fetch(`https://delicate-leaf-1408.fly.dev/posts/fromtag/${categoryId}?page=${postPage}&limit=3`)
                .then((res) => res.json())
                .then((res) => {
                    res.results.map((data: Post) => newPosts.push(data));
                })

                setPosts([...posts,...newPosts]);
        }

        fetchPosts()
    }, [postPage])

    const changePostPage = () => {
        setPostPage(postPage + 1)
    }

    const populateFeed = () => {
        const items = posts.map((post) => <PostItem _id={post._id} 
        title={post.title} date={post.date} tags={post.tags} key={uuid()}
        img={post.img? post.img : ''}/>)

        return <div className='posts'>{items}</div>
    }

    return (
        <div className='category-detail'>
            <div className='center-items'>
                <h1>All {categoryId} posts</h1>
            </div>
            {populateFeed()}
            <div className='center-items'>
                <button className='comment-btn' onClick={changePostPage}>Load more posts</button>
            </div>
        </div>
    )
}

export default CategoryDetail;