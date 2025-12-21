import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./authLayout.css";

const Footer = () => {
  return (
    <footer className="auth-footer">
      <div className="auth-footer__icons">
        <Link to="/#"><FacebookIcon /></Link>
        <Link to="/#"><TwitterIcon /></Link>
        <Link to="/#"><WhatsAppIcon /></Link>
      </div>

      <div className="auth-footer__links">
        <Link to="/#">@Jenee</Link>
        <Link to="/#">Contact</Link>
        <Link to="/#">Confidentialité</Link>
        <Link to="/#">CGU</Link>
      </div>
    </footer>
  );
};

export default Footer;
