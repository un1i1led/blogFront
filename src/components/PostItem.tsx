import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import clockImg from '../assets/clock-ten-thirty-svgrepo-com.svg';
import { formatDistance, parseISO, isThisWeek, format, isThisYear } from 'date-fns';

interface Category {
    _id: string;
    name: string;
    name_lowered: string;
}

interface Post {
    _id: string;
    title: string;
    date: Date;
    tags: Category;
}

const PostItem = (props: Post) => {
    const today = new Date();

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

    return (
        <Link to={`/posts/${props._id}`} key={uuid()}>
                <div className='feed-post'>
                    <div className='post-left'>
                        <p>{props.tags.name}</p>
                        {props.title.split(' ').length > 4 ? <h2 className='smaller-title'>{props.title}</h2> : <h2>{props.title}</h2>}
                        <div className='post-left-date'>
                            <img src={clockImg} alt=''/>
                            <p>
                                {getDate(props.date as unknown as string)}
                            </p>
                        </div>
                    </div>
                    <div className='post-right'>
                        <div></div>
                    </div>
                </div>
            </Link>
    )
}

export default PostItem;