import { Link, useNavigate } from 'react-router-dom';

interface SidebarProps {
    showSidebar: boolean;
    hasToken: boolean;
    controlSidebar: () => void;
    changeToken: (value: boolean) => void;
    changeUsrImg: (usrImg: string) => void;
}

const Sidebar = (props: SidebarProps) => {
    const navigate = useNavigate();

    const popList = () => {
        if (props.hasToken) {
            return (
                <>
                    <Link to={'/new'} onClick={props.controlSidebar}>
                        <li>Create Article</li>
                    </Link>
                    <li onClick={signout}>Signout</li>
                </>
            )
        } else {
            return (
                <>
                    <Link to={'/login'} onClick={props.controlSidebar}>
                        <li>Login</li>
                    </Link>
                    <Link to={'/signup'} onClick={props.controlSidebar}>
                        <li>Signup</li>
                    </Link>
                </>
            )
        }
    }

    const signout = () => {
        props.changeToken(false);
        props.controlSidebar();
        localStorage.removeItem('userToken');
        props.changeUsrImg('');
        navigate('/');
    }

    return (
        <div className={props.showSidebar == true ? 'sidebar show' : 'sidebar'}>
            <div className='sdbar-top'>
                <div className='sdbar-p'>
                    <Link to={'/'} onClick={props.controlSidebar}>Blog</Link>
                </div>
                <div className='sdbar-x'>
                    <p onClick={props.controlSidebar}>X</p>
                </div>
            </div>
            <ul>
                <Link to={'/'} className='hide-mobile'>
                    <li>Home</li>
                </Link>
                <Link to={'https://github.com/un1i1led/blogFront'}>
                    <li>About</li>
                </Link>
                <Link to={'/allcategories'} onClick={props.controlSidebar}>
                    <li>All Categories</li>
                </Link>
                {popList()}
            </ul>
        </div>
    )
}

export default Sidebar;