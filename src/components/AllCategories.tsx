import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

interface Category {
    _id: string;
    name: string;
    name_lowered: string;
}

const AllCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const cats: Category[] = [];

            await fetch('https://delicate-leaf-1408.fly.dev/tags/all')
                .then((res) => res.json())
                .then((res) => {
                    res.tags.map((data: Category) => cats.push(data));
                });
            
            setCategories([...cats]);
        }

        fetchCategories();
    }, [])

    const popCategories = () => {
        const items = categories.map(cat => 
            <Link to={`/category/${cat.name_lowered}`} key={uuid()}>
                <li className='cat-item'>{cat.name}</li>
            </Link>
        );

        return <ul>{items}</ul>
    }

    return (
        <div className='all-cat-main'>
            <div className='center-items'>
                <h1>All Categories</h1>
            </div>
            {popCategories()}
        </div>
    )
}

export default AllCategories;