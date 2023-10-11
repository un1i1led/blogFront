import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostEditor = () => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkForUser = async () => {
            await fetch('http://localhost:3000/login', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.msg == 'token invalid') {
                    localStorage.removeItem('userToken');
                    navigate('/login');
                } else if (res.msg == 'authorized') {
                    navigate('/login');
                }
            })
        }

        checkForUser();
    }, [])

    const closeEditor = () => {
        navigate('/');
    }

    const disableButton = () => {
        if (title.length < 2) {
            return true;
        }

        if (tag.length < 2) {
            return true;
        }

        if (body.length < 2) {
            return true;
        }

        return false;
    }

    const submitPost = async (publish: boolean) => {
        const formData = { title, tag, body, published: publish }

        await fetch(`http://localhost:3000/posts/new`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.errors) {
                console.log(res)
            } else {
                navigate(`${res.postUrl}`);
            }
        })
    }

    return (
        <div className='post-editor'>
            <div className='editor-topbar'>
                <button onClick={closeEditor}>X</button>
            </div>
            <div className='editor-mid'>
                <div>
                    <button>Add a cover image</button>
                </div>
                <div>
                    <input name='title' type='text' className='editor-title-input' placeholder='New post title here..'
                    onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <input name='tag' type='text' className='editor-tag-input' placeholder='Add a tag'
                    onChange={(e) => setTag(e.target.value)}/>
                </div>
            </div>
            <div className='gray-space'></div>
            <textarea name='post-body' id='' cols={30} placeholder='Write your post content here..'
            onChange={(e) => setBody(e.target.value)}></textarea>
            <div className='editor-foot'>
                <button className='publish-btn' disabled={disableButton() ? true : false} onClick={() => submitPost(true)}>Publish</button>
                <button disabled={disableButton() ? true : false}  onClick={() => submitPost(false)}>Save</button>
            </div>
        </div>
    )
}

export default PostEditor;