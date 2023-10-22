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
    const [myProfile, setMyProfile] = useState(false);
    const [userImg, setUserImg] = useState('');
    const [img, setImg] = useState<File | undefined>();
    const [firstRender, setFirstRender] = useState(true);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`https://delicate-leaf-1408.fly.dev/user/${params.username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                }
            })
            .then((res) => res.json())
            .then((res) => {
                const newPosts: Post[] = [];
                setUser(res.user);
                
                res.posts.map((data: Post) => {
                    newPosts.push(data);
                })

                setPosts([...newPosts]);

                if (res.username == res.user.username) {
                    setMyProfile(true);
                }

                setUserImg(res.user.img);
            });
        }

        fetchData();
    }, [])

    useEffect(() => {
        if (firstRender == true) {
            setFirstRender(false);
        } else if (typeof img !== 'undefined') {
            updateProfileImg();
        }
    }, [img])

    const submitImage = async () => {
        const formData = new FormData();
        formData.append('image', img as File);

        try {
            const response = await fetch('https://delicate-leaf-1408.fly.dev/posts/new/image',  {
                method: 'POST',
                body: formData
            });

            const res = await response.json();

            if (res.errors) {
                return { error: res.errors };
            } else {
                return { url: res.url };
            }

        } catch (error) {
            return { error: 'An error ocurred while uploading the image.' };
        }
    }

    const updateProfileImg = async () => {
        const result = await submitImage();

        if (result.error) {
            console.log(result.error);
        } else {
            const data = { imgurl: result.url }
            console.log('data ' + result.url);
            await fetch(`https://delicate-leaf-1408.fly.dev/user/${user?.username}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.errors) {
                    console.log(res)
                } else {
                    setUserImg(result.url);
                }
            })
        }
    }

    const populateFeed = () => {
        const items = posts.map(post => 
            <PostItem _id={post._id} title={post.title} date={post.date} tags={post.tags} key={uuid()}
            img={post.img? post.img : ''}/>
        );

        return <div className='posts'>{items}</div>
    }

    const checkImage = () => {
        if (user) {
            if (userImg.length > 1) {
                return <img src={userImg} alt='user image' onClick={myProfile ? openFileDialogue : undefined}/>
            } else {
                return <img src={noUserImg} alt='user image' onClick={myProfile ? openFileDialogue : undefined}/>
            }
        }
    }

    const openFileDialogue = () => {
        document.getElementById('file')?.click();
    }

    return (
        <div className='profile-main'>
            <div className='user-info-main'>
                <div className='circle'>{checkImage()}</div>
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
            {myProfile && <input type='file' id='file' onChange={(e) => setImg(e.target.files ? e.target.files[0] : undefined)}/>}
        </div>
    )
}

export default Profile;