// src/components/layout/footer.jsx
import React from "react";
import { Card } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <Card className="awFooter" elevation={0}>
      <div className="awFooter-inner">
        <div className="awFooter-links">
          <Link to="#">Jenee</Link>
          <Link to="#">Contact</Link>
          <Link to="#">Confidentialité</Link>
          <Link to="#">CGU</Link>
        </div>

        <div className="awFooter-social">
          <Link to="#" aria-label="Facebook">
            <FacebookIcon />
          </Link>
          <Link to="#" aria-label="Twitter">
            <TwitterIcon />
          </Link>
          <Link to="#" aria-label="WhatsApp">
            <WhatsAppIcon />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default Footer;
