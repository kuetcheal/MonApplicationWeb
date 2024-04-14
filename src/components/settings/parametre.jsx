import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Typography, Divider, Switch } from '@mui/material'
const Parametre = ({ onClose }) => {
    

    // gestion des boutons pour switcher
    const [switches, setSwitches] = useState([false, false, false, false])

    const handleSwitchChange = (index) => (event) => {
        const newSwitches = [...switches]
        newSwitches[index] = event.target.checked
        setSwitches(newSwitches)
    }

    return (
        <div>
            <Box className="settings">
                <div className="settings__header">
                    <ArrowBackIcon className="settings__back" onClick={onClose} />
                    <Typography variant="h5" className="settings__regla">
                        {' '}
                        Réglages{' '}
                    </Typography>
                </div>{' '}
                <Box sx={{ mb: 2 }} />
                <div className="settings__title">
                    <Typography variant="h6">Compte membre</Typography>
                </div>
                <Divider style={{ backgroundColor: 'rgb(236, 236, 236)', width: '100%' }} />{' '}
                <div className="settings__user">
                    <div>
                        {' '}
                        <Typography variant="body1">
                            {' '}
                            <span style={{ color: 'rgb(96, 113, 196)' }}> Jon Vera</span>{' '}
                        </Typography>
                        <Typography>Email : jon.vera@ieseg.fr</Typography>{' '}
                    </div>
                </div>
                <div className="settings__notif">
                    <Typography variant="h5">Notifications</Typography>{' '}
                </div>
                <Divider style={{ backgroundColor: 'rgb(236, 236, 236)', width: '100%' }} />{' '}
                <div className="settings__switch-container">
                    <div className="settings__switch-labels1">
                        <Typography variant="h6">Evénements</Typography>
                        <Typography fontSize={12} className="settings__event">
                            Lorsqu&apos;un événement est crée, modifié et partagé
                        </Typography>
                    </div>
                    <div className="settings__switchicon1">
                        {' '}
                        <Switch checked={switches[0]} onChange={handleSwitchChange(0)} />
                    </div>
                </div>
                <div className="settings__switch-container">
                    <div className="settings__switch-labels2">
                        <Typography variant="h6">Publications</Typography>
                        <Typography fontSize={12} className="settings__event">
                            Lorsque la publication est créé, modifié et partagé
                        </Typography>
                    </div>
                    <div className="settings__switchicon">
                        {' '}
                        <Switch checked={switches[1]} onChange={handleSwitchChange(1)} />
                    </div>
                </div>
                <div className="settings__switch-container">
                    <div className="settings__switch-labels3">
                        <Typography variant="h6">Billeterie</Typography>
                        <Typography fontSize={12} className="settings__event">
                            Lorsque la billeterie est crée, modifié et partagé les billets
                        </Typography>
                    </div>
                    <div className="settings__switchicon">
                        {' '}
                        <Switch checked={switches[2]} onChange={handleSwitchChange(2)} />
                    </div>
                </div>
                <div className="settings__switch-container">
                    <div className="settings__switch-labels4">
                        <Typography variant="h6">Mails</Typography>
                        <Typography fontSize={12} className="settings__event">
                            Lorsqu&apos;un mail a été crée, modifié et partagé le mail
                        </Typography>
                    </div>
                    <div className="settings__switchicon">
                        {' '}
                        <Switch checked={switches[3]} onChange={handleSwitchChange(3)} />
                    </div>
                </div>
                <div className="settings__connexion">
                    <Typography variant="h6">Connexion</Typography>
                </div>
                <Box sx={{ mb: 2 }} />
                <Divider style={{ backgroundColor: 'rgb(236, 236, 236)', width: '100%' }} />
                <Box sx={{ mb: 2 }} />
                <div className="settings__buttons">
                    <div>
                        <button className="settings__button2-modi">
                            Modifier mon mot de passe
                        </button>
                        
                    </div>
                    <div>
                        <button className="settings__button1-delet" >
                            Supprimer mon compte
                        </button>
                       
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Parametre;
