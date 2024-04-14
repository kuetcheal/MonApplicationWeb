//import React from 'react';
import { DialogActions } from '@mui/material'
import Parametre from './parametre'
import Supression from './supression'
import React ,{ useState } from 'react';

const Setting= () => {
     //gestion d'ouverture et de fermeture du Settings
    const [isSecondPopupOpen, setSecondPopupOpen] = useState(false)
    const handleOpenSecondPopup = () => {
        setSecondPopupOpen(true)
    }
    const handleCloseSecondPopup = () => {
        setSecondPopupOpen(false)
    }

    //gestion d'ouverture et de fermeture de la page de deconnection
    const [isForthPopupOpen, setForthPopupOpen] = useState(false)
    const handleOpenForthPopup = () => {
        setForthPopupOpen(true)
    }
    const handleCloseForthPopup = () => {
        setForthPopupOpen(false)
    }


    return (
        <div className="popup">
        <DialogActions>
            <div className="popup__inner">
                <div>
                    <button className="popup__button-set"  onClick={handleOpenSecondPopup} >
                        Settings
                    </button>
                    {isSecondPopupOpen && <Parametre onClose={handleCloseSecondPopup} />}
                </div>
                <div>
                    <button className="popup__button-deco" onClick={handleOpenForthPopup}>
                        Supprimer
                    </button>
                    {isForthPopupOpen && <Supression onClose={handleCloseForthPopup} />}
                </div>
            </div>
        </DialogActions>
    </div>
    );
};

// setting.propTypes = {
    
// };

export default Setting;