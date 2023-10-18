import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import noUserImg from '../assets/user.png';
import PostItem from './PostItem';

interface User {
    name: string;
    username: string;
    img: string;
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

interface Category {
    _id: string;
    name: string;
    name_lowered: string;
}

const Profile = () => {
    const [user, setUser] = useState<User>();
    const [posts, setPosts] = useState<Post[]>([]);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`http://localhost:3000/user/${params.username}`)
            .then((res) => res.json())
            .then((res) => {
                const newPosts: Post[] = [];
                setUser(res.user);
                
                res.posts.map((data: Post) => {
                    newPosts.push(data);
                })

                setPosts([...newPosts]);
            });
        }

        fetchData();
    }, [])

    const populateFeed = () => {
        const items = posts.map(post => 
            <PostItem _id={post._id} title={post.title} date={post.date} tags={post.tags} key={uuid()}
            img={post.img? post.img : ''}/>
        );

        return <div className='posts'>{items}</div>
    }

    return (
        <div className='profile-main'>
            <div className='user-info-main'>
                {user?.img.length > 1 ? <img src={user?.img} alt='user image'/> : <img src={noUserImg} alt='user iamge'/>}
                <div className='user-info-text'>
                    <h1>{user?.name}</h1>
                    <p>@{user?.username}</p>
                </div>
            </div>
            <div className='user-posts-info'>
                <div>
                    <p id='post-number'>{posts?.length}</p>
                    <p id='post-txt'>Posts</p>
                </div>
            </div>
            <div className='user-posts'>
                <h2>Posts</h2>
                {populateFeed()}
            </div>
        </div>
    )
}

export default Profile;