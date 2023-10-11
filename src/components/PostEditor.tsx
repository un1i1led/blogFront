import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostEditor = () => {
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
                    <input name='title' type='text' className='editor-title-input' placeholder='New post title here..'/>
                </div>
                <div>
                    <input name='tag' type='text' className='editor-tag-input' placeholder='Add a tag'/>
                </div>
            </div>
            <div className='gray-space'></div>
            <textarea name='post-body' id='' cols={30} placeholder='Write your post content here..'></textarea>
            <div className='editor-foot'>
                <button className='publish-btn'>Publish</button>
                <button>Save</button>
            </div>
        </div>
    )
}

export default PostEditor;