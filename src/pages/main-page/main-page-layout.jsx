import "./main-page-layout.css"
import NavBAr from "../../components/nav-bar/navBar";
import SearchPage from "../search-page/searchPage";

function  MainPageLayout() {
    return (
      <>
        <div className="Home-page">
          <nav>
            <NavBAr />
          </nav>
          <main className="flex justify-center">
            <div className="container">
            <SearchPage />
            </div>
          </main>
        </div>
      </>
    );
}

export default MainPageLayout;