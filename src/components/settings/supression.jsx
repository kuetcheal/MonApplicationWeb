import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Typography, Divider } from '@mui/material'
import axios from 'axios'




const Suppression = ({ onClose }) => {

    const handleDeleteUser = () => {
        const userId = '40';
      
        axios.delete(`http://localhost:3001/utilisateur/${userId}`)
            .then(response => {
                console.log(response.data.message); 
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            });
    };

    return (
        <Box className="suppression">
            <div className="suppression__header">
                <div className="suppression__back">
                    {' '}
                    <ArrowBackIcon onClick={onClose} />
                </div>
                <Typography variant="h5"> Réglages </Typography>
            </div>
            <Box sx={{ mb: 2 }} />
            <div className="suppression__title1">
                <Typography variant="h6">Suppression de Compte</Typography>{' '}
            </div>
            <Box sx={{ mb: 2 }} />
            <Divider style={{ backgroundColor: 'rgb(247, 247, 247)', width: '100%' }} />
            <Box sx={{ mb: 2 }} /> <Box sx={{ mb: 2 }} />
            <div className="suppression__account">
                <Typography>Etes-vous sûr de vouloir supprimer votre compte ?</Typography>{' '}
            </div>
            <Box sx={{ mb: 2 }} /> <Box sx={{ mb: 2 }} />
            <Box className="suppression__great-box">
                <div className="suppression__little-box">
                    {' '}
                    <Box />{' '}
                </div>
                <div className="suppression__nom">
                    <Typography variant="body1">Jules Andrieux </Typography>{' '}
                </div>
                <div className="suppression__commu">
                    <Typography variant="body1">Communication</Typography>{' '}
                </div>
            </Box>         
            <Divider style={{ backgroundColor: 'rgb(247, 247, 247)', width: '100%' }} />           
            <button  onClick={handleDeleteUser}>Supprimer</button>           
            <div className="suppression__alert">
                <Typography>Attention ! une fois le compte de ce menbre supprimer, vous ne pouvez plus revenir en arrière.</Typography>
            </div>
          
        </Box>
    )
}

export default Suppression
