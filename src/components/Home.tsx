import ArticleFeed from "./ArticleFeed";
import Spotlight from "./Spotlight";
import { useEffect } from 'react';

interface HomeProps {
    changeToken: (value: boolean) => void;
}

const Home = (props: HomeProps) => {

    useEffect(() => {
        const checkToken = async () => {
          await fetch('http://localhost:3000/token', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
              'Content-Type': 'application/json'
            }
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.msg == 'authorized') {
                props.changeToken(true);
              } else {
                localStorage.removeItem('userToken');
                props.changeToken(false);
              }
            });
        }
    
        checkToken();
    
    }, [])

    return (
        <div className='home-main'>
            <Spotlight/>
            <ArticleFeed/>
        </div>
    )
}

export default Home;