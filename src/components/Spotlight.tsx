import img1 from '../assets/breakfast.jpg';
import img2 from '../assets/stars.jpg';
import clockImg from '../assets/clock-ten-thirty-svgrepo-com.svg';

const Spotlight = () => {
    const posts = [
        {
            id: 1,
            imgLink: img1,
            title: 'Lorem ipsum dolor sit amet',
            body: 'posuere. Vivamus pulvinar augue tellus, nec imperdiet leo convallis at. Sed gravida feugiat orci a ultricies. In dapibus mauris et dolor congue volutpat. Cras non turpis sodales, sodales tortor sed, pharetra nisl. Sed tincidunt ipsum nec elit placerat, quis feugiat felis tincidunt. Suspendisse potenti.',
            date: '1h ago',
            tags: ['NFT', 'Technology'],
            published: true
        },
        {
            id: 2,
            imgLink: img2,
            title: 'second post',
            body: 'dakidw kdawiko',
            date: '1h ago',
            tags: ['NFT', 'Technology'],
            published: true
        },
        {
            id: 3,
            title: 'third post',
            body: 'diqwd iwqdkid dwdw',
            date: '2h ago',
            tags: ['NFT', 'Technology'],
            published: true
        }
    ];

    return (
        <div className='spotlight'>
            <div className='spotlight-main'>
                <img src={posts[0].imgLink} alt=''/>
                <span className='spotlight-text'><p>Trending</p></span>
            </div>
            <div className='spotlight-info'>
                <h1>{posts[0].title}</h1>
                <div className='info-small'>
                    <p>{posts[0].tags[0]}</p>
                    <div className='small-date'>
                        <img src={clockImg} alt=''/>
                        <p>{posts[0].date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spotlight;