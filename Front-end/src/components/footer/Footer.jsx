import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';


export const Footer = () => {

  const {t, i18n} = useTranslation();

    return (
        <footer className="bg-custom-blue text-customYellow">
            <div className="bg-customYellow w-100" style={{ height: '3px' }}></div>

            <Container fluid className="px-4 py-5 px-md-5">
                <Row className="g-4 g-md-5">
                    {/* Logo */}
                    <Col xs={12} md={6} lg={3} className="text-center text-lg-start">
                        <img 
                            src={logo} 
                            alt="Cathedral Logo" 
                            className="img-fluid mb-4" 
                            style={{ width: '200px', maxWidth: '100%',height:'300px' }} 
                        />
                    </Col>

                    {/* Menu */}
                    <Col xs={12} sm={6} lg={3}>
                        <h3 className="h5 fw-bold mb-3 text-center text-lg-start">{t('menu')}</h3>
                        <nav>
                            <ul className="list-unstyled text-center text-lg-start m-0 p-0">
                                <li className="mb-2"><Link to="/" className="text-decoration-none text-customYellow hover-effect">{t('home')}</Link></li>
                                <li className="mb-2"><Link to="/about" className="text-decoration-none text-customYellow hover-effect">{t('about')}</Link></li>
                                <li className="mb-2"><Link to="/service" className="text-decoration-none text-customYellow hover-effect">{t('services')}</Link></li>
                                <li className="mb-2"><Link to="/layLeader" className="text-decoration-none text-customYellow hover-effect">{t('ourLeaders')}</Link></li>
                                <li className="mb-2"><Link to="/chorals" className="text-decoration-none text-customYellow hover-effect">{t('ourChorals')}</Link></li>
                                <li className="mb-2"><Link to="/catholicAction" className="text-decoration-none text-customYellow hover-effect">{t('community')}</Link></li>
                            </ul>
                        </nav>
                    </Col>

                    {/* Sacraments */}
                    <Col xs={12} sm={6} lg={3}>
                        <h3 className="h5 fw-bold mb-3 text-center text-lg-start">{t('sacraments')}</h3>
                        <nav>
                            <ul className="list-unstyled text-center text-lg-start m-0 p-0">
                                <li className="mb-2"><Link to="/baptism" className="text-decoration-none text-customYellow hover-effect">{t('baptism')}</Link></li>
                                <li className="mb-2"><Link to="/eucharist" className="text-decoration-none text-customYellow hover-effect">{t('eucharist')}</Link></li>
                                <li className="mb-2"><Link to="/confirmation" className="text-decoration-none text-customYellow hover-effect">{t('confirmation')}</Link></li>
                                <li className="mb-2"><Link to="/marriage" className="text-decoration-none text-customYellow hover-effect">{t('marriage')}</Link></li>
                                <li className="mb-2"><Link to="/reconciliation" className="text-decoration-none text-customYellow hover-effect">{t('reconciliation')}</Link></li>
                                <li className="mb-2"><Link to="/anointing" className="text-decoration-none text-customYellow hover-effect">{t('anointingOfTheSick')}</Link></li>
                            </ul>
                        </nav>
                    </Col>

                    {/* Address & Socials */}
                    <Col xs={12} lg={3} className="text-center text-lg-start">
                        <h3 className="h5 fw-bold mb-3">{t('contact')}</h3>
                        <address className="mb-3">
                            <p className="mb-1">Cathedrale Saint Michel</p>
                            <p className="mb-1">KN 67 St Kigali, Rwanda</p>
                            <p className="mb-1">Kigali, Rwanda</p>
                            <p className="mb-1">Phone: (+250 )788 300 646</p>
                            <p className="mb-1">Email: info@saintmichel.rw</p>
                        </address>

                        <div>
                            <h6 className="mb-2">{t('followUs')}:</h6>
                            <div className="d-flex justify-content-center justify-content-md-start gap-3">
                            <a 
                              href="#" 
                              className="text-customYellow hover-effect" 
                              aria-label="Facebook"
                            >
                              <FaFacebookF size={20} />
                            </a>
                            <a 
                              href="#" 
                              className="text-customYellow hover-effect" 
                              aria-label="Instagram"
                            >
                              <FaInstagram size={20} />
                            </a>
                            <a 
                              href="#" 
                              className="text-customYellow hover-effect" 
                              aria-label="YouTube"
                            >
                              <FaYoutube size={20} />
                            </a>
                          </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className="bg-customYellow w-100" style={{ height: '1px' }}></div>

            <div className="text-center text-sm p-3">
                <p className="mb-0">&copy; {new Date().getFullYear()} CATHEDRALE SAINT MICHEL. All rights reserved.</p>
            </div>

            <div className="bg-customYellow w-100" style={{ height: '2px' }}></div>
        </footer>
    );
};
