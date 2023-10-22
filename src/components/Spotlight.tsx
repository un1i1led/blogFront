import clockImg from '../assets/clock-ten-thirty-svgrepo-com.svg';
import { formatDistance, parseISO, isThisWeek, format, isThisYear } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
    _id: string;
    title: string;
    body: string;
    date: Date;
    published: boolean;
    tags: Category;
    img: string;
}

interface Category {
    _id: string;
    name: string;
    name_lowered: string;
}

const Spotlight = () => {
    const [post, setPost] = useState<Post>();
    const today = new Date();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            await fetch('https://delicate-leaf-1408.fly.dev/spotlight')
            .then((res) => res.json())
            .then((res) => setPost(res.post))
        }

        fetchPost();

    }, [])

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

    const imageOrDiv = () => {
        if (typeof post == 'undefined' || post.img.length < 1) {
            return <div id='spotlight-div-img'></div>
        } else {
            return <img src={post.img} alt=''/>
        }
    }

    const navToPostDetail = () => {
        navigate(`/posts/${post?._id}`);
    }

    const popDivs = () => {
        return (
            <>
                <div className='spotlight-main' onClick={navToPostDetail}>
                    {imageOrDiv()}
                    <span className='spotlight-text'><p>Trending</p></span>
                </div>
                <div className='spotlight-info'>
                    <h1>{post?.title}</h1>
                    <div className='info-small'>
                        <a href='/'>
                            <p>{post?.tags.name}</p>
                        </a>
                        <div className='small-date'>
                            <img className='no-click' src={clockImg} alt=''/>
                            <p>{getDate(post?.date as unknown as string)}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className='spotlight'>
            {post?._id ? popDivs() : ''}
        </div>
    )
}

export default Spotlight;