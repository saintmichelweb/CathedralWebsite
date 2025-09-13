import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/images/Logo.png';
import RwFlag from '../../assets/images/rw.png';
//import FrFlag from '../../assets/images/fr.png';
import EnFlag from '../../assets/images/en.png';
import { useTranslation } from 'react-i18next';
import React, { useRef, useEffect } from 'react';


export const Navbar = () => {

  const {t, i18n} = useTranslation()
  const navbarCollapseRef = useRef(null);

  const changeLanguge = (lng) =>{
    i18n.changeLanguage(lng)
  }


  useEffect(() => {
    const collapseElement = navbarCollapseRef.current;

    if (!collapseElement) return;

    const handleLinkClick = () => {
      if (window.innerWidth < 992) { 
        const bsCollapse = window.bootstrap.Collapse.getInstance(collapseElement);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    };

    const links = collapseElement.querySelectorAll('a.nav-link, .dropdown-item');
    links.forEach(link => link.addEventListener('click', handleLinkClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleLinkClick));
    };
  }, []);





  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: '#223B7D',
        padding: '10px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <div className="container">
        
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={Logo}
            alt="Cathedral Logo"
            width="100"
            height="45"
            className="d-inline-block align-top me-2"
            style={{ objectFit: 'contain' }}
          />
          <span
            style={{
              color: '#F5C542',
              fontWeight: '700',
              fontSize: '1.4rem',
              fontFamily: "'Georgia', serif",
            }}
          >
            {/* Optional site name */}
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-label="Toggle navigation"
          style={{ borderColor: '#F5C542' }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28245, 197, 66, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
            }}
          ></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent" ref={navbarCollapseRef}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            {/* Home */}
            <li className="nav-item mx-2">
              <Link
                className="nav-link position-relative"
                to="/"
                style={{
                  color: '#F5C542',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                }}
              >
                {t('home')}
                <span className="nav-hover-effect"></span>
              </Link>
            </li>

            {/* About Dropdown */}
            <li className="nav-item dropdown mx-2">
              <Link
                className="nav-link dropdown-toggle position-relative"
                to="#"
                id="aboutDropdown"
                role="button"
                data-bs-toggle="dropdown"
                style={{
                  color: '#F5C542',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                }}
              >
                {t('about')}
                <span className="nav-hover-effect"></span>
              </Link>

              <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
                <li><Link className="dropdown-item" to="/about">{t('overview')}</Link></li>
                <li><Link className="dropdown-item" to="/about/parish-committee">{t('ourLeaders')}</Link></li>
                <li><Link className="dropdown-item" to="/about/our-chorals">{t('ourChorals')}</Link></li>
                <li><Link className="dropdown-item" to="/about/community">{t('community')}</Link></li>
              </ul>
            </li>

            {/* Service Dropdown */}
            <li className="nav-item dropdown mx-2">
              <Link
                className="nav-link dropdown-toggle position-relative"
                to="#"
                id="serviceDropdown"
                role="button"
                data-bs-toggle="dropdown"
                style={{
                  color: '#F5C542',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                }}
              >
                {t('services')}
                <span className="nav-hover-effect"></span>
              </Link>

              <ul className="dropdown-menu" aria-labelledby="serviceDropdown">
                <li><Link className="dropdown-item" to="/service">{t('overview')}</Link></li>
                <li><Link className="dropdown-item" to="/services/mass-schedule">{t('massSchedule')}</Link></li>
                <li><Link className="dropdown-item" to="/services/sacraments">{t('sacrements')}</Link></li>
                <li><Link className="dropdown-item" to="/services/parish-office">{t('office')}</Link></li>
              </ul>
            </li>

            {/* Contact */}
            <li className="nav-item mx-2">
              <Link
                className="nav-link position-relative"
                to="/contact"
                style={{
                  color: '#F5C542',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                }}
              >
                {t('contact')}
                <span className="nav-hover-effect"></span>
              </Link>
            </li>
          </ul>

          {/* Language Switcher */}
          <div className="d-flex align-items-center ms-lg-3">
            <div className="btn-group" role="group">

              {/* English */}
              <button
                type="button"
                className="btn btn-sm p-1 border-0"
                style={{ backgroundColor: 'transparent' }}
                title="English"
                onClick={()=>changeLanguge('en')}
              >
                <img
                  src={EnFlag}
                  alt="English"
                  width="28"
                  height="18"
                  className="flag-img rounded-1"
                />
              </button>

              {/* French */}
              {/* <button
                type="button"
                className="btn btn-sm p-1 border-0"
                style={{ backgroundColor: 'transparent' }}
                title="French"
                onClick={()=>changeLanguge('fr')}
              >
                <img
                  src={FrFlag}
                  alt="French"
                  width="28"
                  height="18"
                  className="flag-img rounded-1"
                />
              </button> */}

              {/* Kinyarwanda */}
              <button
                type="button"
                className="btn btn-sm p-1 border-0"
                style={{ backgroundColor: 'transparent' }}
                title="Kinyarwanda"
                onClick={()=>changeLanguge('rw')}
              >
                <img
                  src={RwFlag}
                  alt="Kinyarwanda"
                  width="28"
                  height="18"
                  className="flag-img rounded-1"
                />
              </button>

            </div>
          </div>

        </div>
      </div>


    </nav>
  );
};
