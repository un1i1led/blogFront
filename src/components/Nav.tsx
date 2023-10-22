import notifImg from '../assets/notification-14-svgrepo-com.svg';
import hamburger from '../assets/hamburger-svgrepo-com.svg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NavDetails {
    hasToken: boolean;
    username: string;
    controlSidebar: () => void;
    changeToken: (value: boolean) => void;
    changeUsername: (usrname: string) => void;
    changeUsrImg: (usrImg: string) => void;
}

const Nav = (props: NavDetails) => {
    const [img, setImg] = useState('');
    const [firstRender, setFirstRender] = useState(true);
    const location = useLocation();

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
                  props.changeUsername(res.username);
                } else {
                  localStorage.removeItem('userToken');
                  props.changeToken(false);
                  props.changeUsername('');
                }
              });
        }
      
        checkToken();
    }, [])

    useEffect(() => {
        const getImage = async () => {
            await fetch(`http://localhost:3000/user/${props.username}/image`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                }
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.errors) {
                    console.log(res)
                } else {
                    const imgUrl = res.img.img;
                    const versionPart = /\/v\d+/;
                    const scaledImg = imgUrl.replace(versionPart, '/c_scale,h_40,w_40');

                    setImg(scaledImg);

                    const smallerImg = imgUrl.replace(versionPart, '/c_scale,h_32,w_32');
                    props.changeUsrImg(smallerImg);
                }
            })
        }

        if (firstRender == true) {
            setFirstRender(false);
        } else {
            getImage();
        }
    }, [props.username])

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
                        <Link to={`/user/${props.username}`}>
                            <div className='small-circle'>
                                <img src={img} alt='user image'/>
                            </div>
                        </Link>
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
                        <Link to={'/signup'} id='signup-nav-a'>
                            <button className='nav-login-btn'>Signup</button>
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