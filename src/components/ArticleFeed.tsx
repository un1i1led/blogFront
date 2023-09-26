import CategoriesSlider from "./CategoriesSlider";
import { useState, useEffect } from 'react';

interface category {
    id: string;
    name: string;
    name_lowered: string;
}

const ArticleFeed = () => {
    const [categories, setCategories] = useState<category[]>([{id: '0', name: 'All', name_lowered: 'all'}]);
    const [category, setCategory] = useState('All');

    const changeCategory = (name:string) => {
        setCategory(name);
    }

    useEffect(() => {
        async function fetchCategories() {
            const newCategories: category[] = []

            await fetch('http://localhost:3000/tagslider')
                .then(res => res.json())
                .then(res => {
                    res.tags.map((data) => newCategories.push(data))
                })

            setCategories([...categories, ...newCategories])
        }
        
        fetchCategories();

    }, []);

    return (
        <div className='feed'>
            <CategoriesSlider categories={categories} category={category} changeCategory={changeCategory}/>
        </div>
    )
}

export default ArticleFeed;