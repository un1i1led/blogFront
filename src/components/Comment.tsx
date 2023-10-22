interface CommentDetail {
    comment: Comment;
    getDate: (date: string) => string;
}

interface User {
    _id: string;
    name: string;
    img: string;
}

interface Comment {
    _id: string;
    user: User;
    post: string;
    body: string;
    date: Date;
}

const Comment = (props: CommentDetail) => {
    const versionPart = /\/v\d+/;
    const smallerImg = props.comment.user.img?.replace(versionPart, '/c_scale,h_32,w_32');

    return (
        <div className='comment-main'>
            <div className='comment-left'>
                <div className='smallest-circle'>
                    <img src={smallerImg} alt='user image'/>
                </div>
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