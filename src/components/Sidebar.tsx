interface SidebarProps {
    showSidebar: boolean;
    hasToken: boolean;
    controlSidebar: () => void;
}

const Sidebar = (props: SidebarProps) => {
    const popList = () => {
        if (props.hasToken) {
            return (
                <>
                    <li>Create Article</li>
                    <li>Signout</li>
                </>
            )
        } else {
            return (
                <>
                    <li>Login</li>
                    <li>Register</li>
                </>
            )
        }
    }

    return (
        <div className={props.showSidebar == true ? 'sidebar show' : 'sidebar'}>
            <div className='sdbar-top'>
                <div className='sdbar-p'>
                    <p>Blog</p>
                </div>
                <div className='sdbar-x'>
                    <p onClick={props.controlSidebar}>X</p>
                </div>
            </div>
            <ul>
                <li>About</li>
                <li>All Categories</li>
                {popList()}
            </ul>
        </div>
    )
}

export default Sidebar;