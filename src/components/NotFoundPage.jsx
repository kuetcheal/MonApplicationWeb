import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Card} from "@mui/material";
const styles = {
    card: {
      backgroundColor: "black",
      height: "656px",
      width: "100%",
    },
  };

const NotFoundPage = () => {
  return (
    <Card style={styles.card}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", color: "white" }}>
        <ErrorIcon style={{ fontSize: "52px", color: "red" }} />
       <h1 style={{ fontSize: "28px" }}>Erreur 404</h1>
       <p style={{ fontSize: "20px" }}>La page que vous recherchez est introuvable.</p>
    </div>

    </Card>
  );
};

export default NotFoundPage;
