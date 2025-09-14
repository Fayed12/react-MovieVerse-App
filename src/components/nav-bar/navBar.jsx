import LetterAvatars from "../avtar";
import "./navBar.css"

function NavBAr() {
    return ( 
        <>
            <div className="nav-bar flex justify-between items-center w-full h-[80px]">
                <div className="logo">
                    <img src="/MovieVerse-logo.png" alt="movieVerse logo" className="w-[200px]"/>
                </div>
                <div className="user">
                    <LetterAvatars/>
                </div>
        </div>
        </>
    );
}

export default NavBAr;