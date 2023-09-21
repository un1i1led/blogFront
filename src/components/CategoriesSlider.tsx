import { v4 as uuidv4 } from 'uuid';

const CategoriesSlider = () => {
    const categories = [
        {name: 'NFT', selected: true},
        {name: 'Web', selected: false},
        {name: 'Technology', selected: false},
        {name: 'AI', selected: false}
    ];

    const popCats = () => {
       const items = categories.map(data => 
            <li key={uuidv4()} className={data.selected ? 'cat-selected' : 'cat-unselected'}>{data.name}</li>
        );

        return <ul className='cat-list'>{items}</ul>
    }

    return (
        <div className='categories'>
            <div className='cat-top'>
                <p className='bold'>Categories</p>
                <a href=''>
                    <p className='snd-color'>View more</p>
                </a>
            </div>
            <div className='cat-bot'>
                {popCats()}
            </div>
        </div>
    )
}

export default CategoriesSlider;