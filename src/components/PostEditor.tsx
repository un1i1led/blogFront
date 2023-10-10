const PostEditor = () => {
    return (
        <div className='post-editor'>
            <div className='editor-topbar'>
                <button>X</button>
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