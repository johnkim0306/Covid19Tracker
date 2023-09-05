import React from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import LanguageIcon from '@mui/icons-material/Language';
import { styled } from '@mui/material/styles'; // Import the styled function

import './Sidebar.scss';

const StyledButton = styled(Button)(({ theme }) => ({
  height: theme.spacing(7),
  color: 'black',
  background: 'white',
  borderColor: theme.palette.text.primary, // Use the text.primary color from the theme
  borderRadius: 3,
  width: '100%',
  padding: '0.5rem',
  '& .MuiSvgIcon-root': {
    color: 'black',
    verticalAlign: 'middle',
  },
}));

const Sidebar = ({ activateCanada, activateWorldWide }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__title">
        <h1 className="sidebar__title--text"> CORONA LIVE </h1>
      </div>
      <div className="btn-group">
        <StyledButton variant="outlined" color="secondary" size="large" onClick={activateCanada}>
          <SportsHockeyIcon /> Canada
        </StyledButton>
        <StyledButton variant="outlined" color="secondary" size="large" onClick={activateWorldWide}>
          <LanguageIcon /> Worldwide
        </StyledButton>
      </div>
      <div className="btn-group">
        <StyledButton variant="outlined" color="secondary" size="large" href="https://github.com/johnkim0306/react-covid-tracker" endIcon={<GitHubIcon />}>
          Github
        </StyledButton>
        <StyledButton variant="outlined" color="secondary" size="large" href="http://www.google.com" endIcon={<LanguageRoundedIcon />}>
          Portfolio
        </StyledButton>
        <StyledButton variant="outlined" color="secondary" size="large" href="#contact" endIcon={<SendIcon />}>
          Contact
        </StyledButton>
      </div>
    </div>
  );
};

export default Sidebar;
