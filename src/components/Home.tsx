import ArticleFeed from "./ArticleFeed";
import Spotlight from "./Spotlight";
import { useEffect } from 'react';

interface HomeProps {
    changeToken: (value: boolean) => void;
    changeUsername: (usrname: string) => void;
    changeUsrImg: (usrImg: string) => void;
}

const Home = (props: HomeProps) => {

    useEffect(() => {
        const checkToken = async () => {
          await fetch('https://delicate-leaf-1408.fly.dev/token', {
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
                props.changeUsername(res.username);
              } else {
                localStorage.removeItem('userToken');
                props.changeToken(false);
                props.changeUsername('');
                props.changeUsrImg('');
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