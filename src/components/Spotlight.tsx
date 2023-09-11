const Spotlight = () => {
    const posts = [
        {
            id: 1,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt dui et est suscipit',
            body: 'posuere. Vivamus pulvinar augue tellus, nec imperdiet leo convallis at. Sed gravida feugiat orci a ultricies. In dapibus mauris et dolor congue volutpat. Cras non turpis sodales, sodales tortor sed, pharetra nisl. Sed tincidunt ipsum nec elit placerat, quis feugiat felis tincidunt. Suspendisse potenti.',
            date: new Date(),
            published: true
        },
        {
            id: 2,
            title: 'second post',
            body: 'dakidw kdawiko',
            date: new Date(),
            published: true
        },
        {
            id: 3,
            title: 'third post',
            body: 'diqwd iwqdkid dwdw',
            date: new Date(),
            published: true
        }
    ];

    return (
        <div className='spotlight-main'>
            <div className='left'>
                <div className='post-border'>
                    <div className='spt-img'></div>
                    <h2>{posts[0].title}</h2>
                    <p>{posts[0].body}</p>
                </div>
            </div>
            <div className='right'>
                <div className='post-border'>
                    <h2>{posts[1].title}</h2>
                    <p>{posts[1].body}</p>
                </div>
                <div className='post-border'>
                    <h2>{posts[2].title}</h2>
                    <p>{posts[2].body}</p>
                </div>
            </div>
        </div>
    )
}

export default Spotlight;