import notifImg from '../assets/notification-14-svgrepo-com.svg';
import hamburger from '../assets/hamburger-svgrepo-com.svg';
import { Link, useLocation } from 'react-router-dom';

interface NavDetails {
    hasToken: boolean;
    controlSidebar: () => void;
}

const Nav = (props: NavDetails) => {
    const location = useLocation();

    const popWhenToken = () => {
        return (
            <div className='nav-main'>
                <div className='nav nav-left'>
                    <div>
                        <img className='small-img' src={hamburger} alt='' onClick={props.controlSidebar}/>
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
                        <div className='comment-img'></div>
                    </div>
                </div>
            </div>
        )
    }

    const popWhenNoToken = () => {
        return (
            <div className='nav-main'>
                <div className='nav nav-left'>
                    <div>
                        <img className='small-img' src={hamburger} alt='' onClick={props.controlSidebar}/>
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
                    <div className='nav-login-div'>
                        <Link to={'/login'}>
                            <button className='nav-login-btn'>Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const nullOrNot = () => {
        if (location.pathname === '/new') {
            return null;
        } else {
            return (
                <div className='nav-empty'>
                    {props.hasToken == true ? popWhenToken() : popWhenNoToken()}
                </div>
            )
        }
    }

    return (
        <>
            {nullOrNot()}
        </>
    )
}

export default Nav;