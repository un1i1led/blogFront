import CategoriesSlider from "./CategoriesSlider";
import clockImg from '../assets/clock-ten-thirty-svgrepo-com.svg';
import { useState, useEffect } from 'react';
import { formatDistance, parseISO } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

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

const ArticleFeed = () => {
    const [categories, setCategories] = useState<Category[]>([{_id: '0', name: 'All', name_lowered: 'all'}]);
    const [category, setCategory] = useState<Category>({_id: '0', name: 'All', name_lowered: 'all'});
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const today = new Date();

    const changeCategory = (newCategory:Category) => {
        if (newCategory._id != category._id) {
            setCategory(newCategory);
        }
    }

    useEffect(() => {
        async function fetchCategories() {
            const newCategories: Category[] = []

            await fetch('http://localhost:3000/tagslider')
                .then(res => res.json())
                .then(res => {
                    res.tags.map((data: Category) => newCategories.push(data));
                })

            setCategories([...categories, ...newCategories])
        }

        async function fetchAllPosts() {
            const newPosts: Post[] = []

            await fetch('http://localhost:3000/posts')
                .then(res => res.json())
                .then(res => {
                    res.posts.map((data: Post) => newPosts.push(data));
                })
            
            setPosts([...newPosts]);
        }
        
        if (categories.length < 2) {
            fetchCategories();
        }

        fetchAllPosts();
        setFirstLoad(false);

    }, []);

    useEffect(() => {
        async function fetchNewPosts() {
            const newPosts: Post[] = []

            const url = `http://localhost:3000/posts/fromtag/${category.name_lowered}`;
            const allUrl = 'http://localhost:3000/posts';

            await fetch(category._id == '0' ? allUrl : url)
                .then(res => res.json())
                .then(res => {
                    res.posts.map((data: Post) => newPosts.push(data));
                })
                
            
            setPosts([...newPosts]);
        }

        if (firstLoad == false) {
            fetchNewPosts();
        }
    }, [category])

    const populateFeed = () => {
        const items = posts.map(post => 
            <Link to={`/posts/${post._id}`} key={uuid()}>
                <div className='feed-post' key={uuid()}>
                    <div className='post-left'>
                        <p>{post.tags.name}</p>
                        {post.title.split(' ').length > 4 ? <h2 className='smaller-title'>{post.title}</h2> : <h2>{post.title}</h2>}
                        <div className='post-left-date'>
                            <img src={clockImg} alt=''/>
                            <p>
                                {formatDistance(today, parseISO(post.date as unknown as string))} ago
                            </p>
                        </div>
                    </div>
                    <div className='post-right'>
                        <div></div>
                    </div>
                </div>
            </Link>
        );

        return <div className='posts'>{items}</div>
    }

    return (
        <div className='feed'>
            <CategoriesSlider categories={categories} category={category} changeCategory={changeCategory}/>
            {populateFeed()}
        </div>
    )
}

export default ArticleFeed;