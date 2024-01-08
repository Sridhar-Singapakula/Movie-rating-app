
import { useHistory, Link } from "react-router-dom";
import AOS from 'aos';
import { useEffect,useState } from 'react';
import logo from "../../img/logo.png";
import "./style.css";


const Navbar = () => {
	const [menu, setMenu] = useState(false);

	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); 

    const handleMobileNavToggle = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };
    const handleNavLinkClick = () => {
      setIsMobileNavOpen(false);
    };
    const sliderSettings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000, // Set the interval between slides (in milliseconds)
      };
      useEffect(() => {
        AOS.init();
        
      }, []);

	return (
	<header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" style={{ display: "flex" }}>
          <div>
          <a href="/" className="logo me-auto">
            <img src={logo} alt="" />
          </a>
          </div>         
        </Link>

        <nav id="navbar" className={`navbar order-last order-lg-0 ${isMobileNavOpen ? 'mobile-nav-open' : ''}`}>
          
          <ul>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto active" href="/">Home</a></li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="/GC">Services</a></li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="#services">Availability</a></li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="#contact"><button className="button-40">Contact <i class="bi bi-telephone-fill"></i></button></a></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" onClick={handleMobileNavToggle} ></i>
        </nav>
      </div>
    </header>
	);
};

export default Navbar;
