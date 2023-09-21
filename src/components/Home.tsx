import ArticleFeed from "./ArticleFeed";
import Spotlight from "./Spotlight";

const Home = () => {
    return (
        <div className='home-main'>
            <Spotlight/>
            <ArticleFeed/>
        </div>
    )
}

export default Home;