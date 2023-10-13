import CategoriesSlider from "./CategoriesSlider";
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import PostItem from "./PostItem";

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
    const [postPage, setPostPage] = useState(1);

    const changeCategory = (newCategory:Category) => {
        setPostPage(1);
        if (newCategory._id != category._id) {
            setCategory(newCategory);
        }
    }

    const changePostPage = () => {
        setPostPage(postPage + 1);
    }

    const fetchNewPosts = async (effect: string) => {
        const newPosts: Post[] = [];

        if (category._id == '0') {
            await fetch(`http://localhost:3000/posts?page=${postPage}&limit=3`)
                .then((res) => res.json())
                .then((res) => {
                    res.results.map((data: Post) => newPosts.push(data));
                })
        } else {
            await fetch(`http://localhost:3000/posts/fromtag/${category.name_lowered}?page=${postPage}&limit=3`)
                .then((res) => res.json())
                .then((res) => {
                    res.results.map((data: Post) => newPosts.push(data));
                })
        }

        if (effect == 'postPage') {
            setPosts([...posts, ...newPosts]);
        } else {
            setPosts([...newPosts]);
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

            await fetch(`http://localhost:3000/posts?page=${postPage}&limit=3`)
                .then(res => res.json())
                .then(res => {
                    res.results.map((data: Post) => newPosts.push(data));
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
        if (firstLoad == false) {
            fetchNewPosts('category');
        }
    }, [category])

    useEffect(() => {
        if (firstLoad == false) {
            fetchNewPosts('postPage');
        }
    }, [postPage])

    const populateFeed = () => {
        const items = posts.map(post => 
            <PostItem _id={post._id} title={post.title} date={post.date} tags={post.tags} key={uuid()}/>
        );

        return <div className='posts'>{items}</div>
    }

    return (
        <div className='feed'>
            <CategoriesSlider categories={categories} category={category} changeCategory={changeCategory}/>
            {populateFeed()}
            <div className='center-items'><button className='comment-btn' onClick={changePostPage}>Load more posts</button></div>
        </div>
    )
}

export default ArticleFeed;