import Logo from './Logo'
import './NavBarStyle.css'

function navBar(){
    return<>
        <div id="nav-bar">
            <div className="left-nav">
                <div className="logo-container">
                    <Logo />
                    <h1>Pristinum Meet</h1>
                </div>
            </div>
        </div>
    </>
}

export default navBar;