import { useState } from 'react';

interface User {
    _id: string;
    name: string;
}

interface CommentType {
    _id: string;
    user: User;
    post: string;
    body: string;
    date: Date;
}

interface CommentProps {
    postId: string;
    username: string;
    addNewComment: (comment: CommentType) => void;
}

const CommentEditor = (props: CommentProps) => {
    const [hasClicked, setHasClicked] = useState(false);
    const [comment, setComment] = useState('');

    const submitComment = async () => {
        const formData = { comment }

        await fetch(`http://localhost:3000/posts/${props.postId}/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.comment) {
                const newComment = {
                    body: res.comment.body,
                    date: res.comment.date,
                    post: res.comment.post,
                    _id: res.comment.id,
                    __v: res.comment.__v,
                    user: {_id: res.comment.user, name: res.name}
                }

                props.addNewComment(newComment)
                setComment('');
            }
        });
    }

    const popSubmitBtn = () => {
        setHasClicked(true);
    }

    return (
        <div className='text-editor-main' id='comment-form'>
            <form action=''>
                <textarea name='comment-ta' id='comment-ta' cols={30} rows={5} placeholder="Add a comment" onClick={popSubmitBtn} onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
                {hasClicked ? <button type='button' className='add-comment-btn' onClick={submitComment} disabled={comment.length > 1 ? false : true}>Submit</button> : ''}
            </form>
        </div>
    )
}

export default CommentEditor;