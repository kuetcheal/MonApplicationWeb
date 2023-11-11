import React, { useState } from "react";
import { Typography, Divider, Box, IconButton, Card } from "@mui/material";
import "./navbar.css";
import Videos from "./videos";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
//import IconButton from "@mui/material/IconButton";

function Navbar() {
  //clique des liens consécutives
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  //ouventure et fermeture du chanel
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(!state);
  };

  //Gestion de tri des éléments
  const [texteRecherche, setTexteRecherche] = useState("");
  const [imagesTriees, setImagesTriees] = useState(itemData);

  const gererChangementRecherche = (event) => {
    const recherche = event.target.value.toLowerCase();

    const triees = itemData.filter((item) => {
      const title = item.title.toLowerCase();
      return title.startsWith(recherche);
    });

    setTexteRecherche(recherche);
    setImagesTriees(triees);
  };

  const [showAllVideo, setShowAllVideo] = useState(true);
  const toggleShowAllVideo = () => {
    setShowAllVideo(!showAllVideo);
  };

  const filteredItems = showAllVideo ? itemData : itemData.slice(0, 4);

  return (
    <Card style={{ backgroundColor: "black", height: "100%", width: "100%" }}>
      <div className="blogs">
        <div className="infos">
          <div className="logo">
            <img
              src={process.env.PUBLIC_URL + "/carte_afrique.png"}
              alt="Mon image"
              style={{
                color: "rgb(255, 154, 98)",
                width: "110px",
                height: "120px",
                marginTop: "20px",
                marginLeft: "25px",
              }}
            />
          </div>
          <div className="tittle1" style={{ color: "white" }}>
            <Typography variant="h4" component="h2">
              {" "}
              AFRICA-<span>WEB</span>{" "}
            </Typography>
          </div>
        </div>
        <div className="navbars">
          <ul className="liste">
            <li>
              {" "}
              <a
                href="javascript:void(0)"
                onClick={() => handleLinkClick(0)}
                className={activeLink === 0 ? "active" : ""}
              >
                Vidéos
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => handleLinkClick(1)}
                className={activeLink === 1 ? "active" : ""}
              >
                Actrices
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => handleLinkClick(2)}
                className={activeLink === 2 ? "active" : ""}
              >
                Nos Lives
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => handleLinkClick(3)}
                className={activeLink === 3 ? "active" : ""}
              >
                {" "}
                Nos Engagements
              </a>
            </li>
          </ul>
        </div>
        <div className="outil">
          <NotificationImportantIcon style={{ marginRight: "14px" }} />
          <AddToPhotosIcon style={{ marginRight: "14px" }} />
          <AccountCircleIcon style={{ marginRight: "14px" }} />
          <LanguageIcon />
        </div>
      </div>

      <div className="blog2">
        <div className="titlle2">
          <h1>Mes Events</h1>
        </div>
        <div
          className="second-nav"
          style={{ display: "flex", marginLeft: "100px" }}
        >
          <ul className="nouveaute" style={{ display: "flex" }}>
            <li>
              <a href="#">Nouveautés</a>
            </li>
            <li>
              <a href="#">Tendances</a>
            </li>
            <li>
              <a href="#">Les plus regardés</a>
            </li>
          </ul>
        </div>

        <div className="boxe">
          <div className="input-containers">
            <input
              className="edite-input4"
              placeholder="Rechercher..."
              type="text"
              value={texteRecherche}
              onChange={gererChangementRecherche}
            />
          </div>
          <div className="icon-containers">
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "white",
                width: "1px",
                height: "58px",
                marginLeft: "40px",
              }}
            />
            <IconButton
              style={{
                color: "rgb(224, 12, 139)",
                fontSize: "16px",
                marginLeft: "20px",
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="blog3" style={{ marginTop: "5px" }}>
          <div className="events">
            <div className="biblio">
              <div className="icone-biblio">
                {" "}
                <AddToPhotosIcon
                  style={{ marginTop: "5px", marginRight: "15px" }}
                />
              </div>
              <div className="write-biblio">
                {" "}
                <Typography variant="h5" component="h3">
                  Ma Bibliothèque
                </Typography>
              </div>
            </div>
            <div className="all-events">
              <ul className="historic">
                <li>
                  {" "}
                  <a href="#"> Mon historique</a>
                </li>
                <li>
                  <ThumbUpIcon />
                  <a href="#"> Mes favoris</a>
                </li>
                <li>
                  <VideoLibraryIcon />
                  <a
                    href="#"
                    style={{
                      color: "rgb(224, 12, 139)",
                      marginLeft: "5px",
                      marginBottom: "20px",
                    }}
                  >
                    Show all videos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="chaines">
            <Divider
              sx={{
                backgroundColor: "white",
                width: "300px",
                marginBottom: "40px",
              }}
            />{" "}
            <Box sx={{ mb: 2 }} />
            <div className="list-channel">
              <div className="channel">
                {" "}
                <Typography variant="h5" component="h3">
                  {" "}
                  Channels{" "}
                </Typography>
              </div>
              <div className="next" onClick={handleClick}>
                {state ? (
                  <ArrowDropDownIcon
                    style={{
                      fontSize: 40,
                      color: "rgb(255, 154, 98)",
                      marginRight: "0px",
                    }}
                  />
                ) : (
                  <ArrowLeftIcon
                    style={{ fontSize: 40, color: "rgb(255, 154, 98)" }}
                  />
                )}
              </div>
              {state && (
                <div className="div">
                  <ul className="menu">
                    <li className="items">Web tv</li>
                    <li className="items">Actu debat tv</li>
                    <li className="items">Breaking news tv</li>
                  </ul>
                </div>
              )}
            </div>
            <Box sx={{ mb: 2 }} />
            <Divider
              sx={{
                backgroundColor: "white",
                width: "300px",
                marginTop: "40px",
              }}
            />
          </div>
          <Box sx={{ mb: 0 }} />
          <div className="channel">
            {" "}
            <Typography
              variant="h6"
              component="h3"
              style={{ color: "rgb(255, 154, 98)", marginLeft: "40px" }}
            >
              {" "}
              Web catégories{" "}
            </Typography>
          </div>
          <div className="categorie">
            <ul className="categorie-web">
              <li>
                {" "}
                <a href=""> Web comedie</a>
              </li>
              <li>
                <a href="">Prank</a>
              </li>
              <li>
                <a href="">Web series</a>
              </li>
              <li>
                <a href=""> Actualités</a>
              </li>
              <li>
                <a href=""> Débats</a>
              </li>
              <li>
                <a href="">Lives</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="videos">
          {/* <Videos/> */}

          {imagesTriees.length === 0 ? (
            <div className="empty-image-list">
              Oups !!! Aucune image ne correspond à la recherche.
            </div>
          ) : (
            <ImageList className="customImageList">
              <ImageListItem key="Subheader" cols={4}></ImageListItem>

              {imagesTriees.map((item) => (
                <ImageListItem key={item.title} className="imageItem">
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                    subtitle={item.author}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.title}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </div>
      </div>
      <div className="button-container">
        <button onClick={toggleShowAllVideo} className="button1">
          {showAllVideo
            ? "Cacher les autres photos"
            : "Afficher plus de contenus"}
        </button>
        {showAllVideo && <Videos />}
      </div>
    </Card>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];
export default Navbar;
