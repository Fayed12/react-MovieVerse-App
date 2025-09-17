import "./navBar.css";

// MUI library
import LetterAvatars from "../avtar";
// ==========================================================================================

function NavBAr() {
  return (
    <>
      <div className="nav-bar flex justify-between items-center w-full h-[80px]">
        <div className="logo">
          <img
            src="/MovieVerse-logo.png"
            alt="movieVerse logo"
            className="w-[180px]"
          />
        </div>
        <div className="user">
          <LetterAvatars />
        </div>
      </div>
    </>
  );
}

export default NavBAr;
