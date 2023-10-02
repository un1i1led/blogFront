import notifImg from '../assets/notification-14-svgrepo-com.svg';
import hamburger from '../assets/hamburger-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='nav-main'>
            <div className='nav nav-left'>
                <div>
                    <img className='small-img' src={hamburger} alt=''/>
                </div>
            </div>
            <div className='nav nav-mid'>
                <Link to={'/'}>
                    <div className='mid-block'>
                        <p>Blog</p>
                    </div>
                </Link>
            </div>
            <div className='nav nav-right'>
                <div>
                    <img className='mid-img' src={notifImg} alt='notifications'/>
                </div>
            </div>
        </div>
    )
}

export default Nav;