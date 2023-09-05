"use client";

import React, { useEffect, useState } from "react";
import './Header.scss';
import { styles } from "../../styles/styles";
import Link from 'next/link'

import logo from "../../images/disease.png";
import { navLinks } from "../../constants";
import { menu, close } from "../../assets";

// import { navLinks } from "../../constants";

const Header = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX
        } w-full flex items-center py-5 fixed top-0 z-40 ${
          scrolled ? "bg-metal border-b-2 border-primary" : "bg-transparent"
        } border-b-0.1 border-solid border-opacity-25 border-black`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>

          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-black text-[18px] font-bold cursor-pointer flex '>
            Covid-19 &nbsp;
            <span className='sm:block hidden'> | Tracker</span>
          </p>
      </div>
      <ul className='list-none hidden sm:flex flex-row gap-10 bg-metal'>
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`${active === nav.title ? "bg-metal2" : "text-secondary"
              } hover:text-slate-300 text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive(nav.title)}
          >
            {index === 2 ? (
              // <Link to={`#${nav.id}`}>{nav.title}</Link>
              <a href={`/#${nav.id}`}>{nav.title}</a>
            ) : (
              <Link href="/diagnosis">{nav.title}</Link>
            )}
          </li>
        ))}
      </ul>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "bg-metal2" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
    </div>



    </nav>



  );
};

export default Header;
