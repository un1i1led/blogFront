interface CommentDetail {
    comment: Comment;
    getDate: (date: string) => string;
}

interface User {
    _id: string;
    name: string;
}

interface Comment {
    _id: string;
    user: User;
    post: string;
    body: string;
    date: Date;
}

const Comment = (props: CommentDetail) => {
    return (
        <div className='comment-main'>
            <div className='comment-left'>
                <div className='comment-img'></div>
            </div>
            <div className='comment-right'>
                <div className='comment-right-top'>
                    <h4>{props.comment.user.name}</h4>
                    <p className='dot'>•</p>
                    <p>{props.getDate(props.comment.date as unknown as string)}</p>
                </div>
                <div className='comment-right-bot'>
                    <p>{props.comment.body}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;