import { v4 as uuidv4 } from 'uuid';

interface sliderDetails {
    categories: Array<category>;
    category: string;
    changeCategory(name:string): void;
}

interface category {
    id: string;
    name: string;
    name_lowered: string;
}

const CategoriesSlider = (props: sliderDetails) => {

    const popCats = () => {
       const items = props.categories.map(data => 
            <li key={uuidv4()} className={props.category == data.name ? 'cat-selected' : 'cat-unselected'} onClick={() => props.changeCategory(data.name_lowered)}>{data.name}</li>
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