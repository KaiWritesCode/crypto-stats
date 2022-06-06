import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from 'react-router-dom'

export default function SearchNavbar({ inputValue, setInputValue }) {
  let [openMenu, setOpenMenu] = useState(false);


  const openNavMenu = () => {
    setOpenMenu(true);
  };

  const closeNavMenu = () => {
    setOpenMenu(false);
  };



  const searchBar = (
    <div className={`search-wrapper ${openMenu ? 'flex-menu' : 'closed-menu'}`}>
      <input
        type="search"
        className='search-input'
        placeholder="Search..."
        onChange={e => setInputValue(e.target.value)}
        value={inputValue || ''}
        name="searchBar"
      />

      <button id="search-btn"><svg className='search-svg' viewBox="0 0 1024 1024"><path className="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg></button>

    </div>
  )



  useEffect(() => {
    openMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [openMenu]);

  const navmodal = (
    <div
      className={`nav-links-modal ${openMenu ? "active-nav-links" : "closed-nav-links"
        }`}
    >
      <div className="main-nav">
        <Link to={`/`}>
          <span className="logo">
            <img
              src="/crypto-stats/images/invest-bitcoins-removebg-preview.png"
              width="80px"
              alt=""
            />
            CryptoStats
          </span>
        </Link>
        <div
          className={`close-icon ${openMenu ? "active-menu" : "close-menu"}`}
          onClick={closeNavMenu}
        >
          <CloseIcon />
        </div>
      </div>
      <ul style={{ margin: ".5em 2em " }}>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/categories`}>Categories</Link>
        </li>
        <li>
          <Link to={`/`}>Exchanges</Link>
        </li>
        <li>
          <Link to={`/`}>About</Link>
        </li>
        {searchBar}
      </ul>
    </div>
  );

  const mainnav = (
    <div>
      <div className="nav-container">
        <nav className="main-nav">
          <Link to={`/`}>

            <span className="logo">
              <img
                src="/crypto-stats/images/invest-bitcoins-removebg-preview.png"
                width="80px"
                alt=""
              />
              CryptoStats
            </span>
          </Link>
          <div
            className={` menu-icon ${openMenu ? "no-menu" : "active-menu"}`}
            onClick={openNavMenu}
          >
            <MenuIcon />
          </div>
          <div className="link-search-container">
            <ul className="nav-links">
              <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <Link to={`/categories/`}>Categories</Link>
              </li>
              <li>
                <Link to={`/`}>Exchanges</Link>
              </li>
              <li>
                <Link to={`/`}>About</Link>
              </li>
            </ul>
            {searchBar}
          </div>
        </nav>
      </div>
    </div>
  )

  return (
    <>
      {mainnav}
      {navmodal}
    </>
  );
}


