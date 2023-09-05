import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  height: theme.spacing(15),
  margin: theme.spacing(1),
  background: 'linear-gradient(to right bottom, #E0C3FC, #8EC5FC)',
  borderRadius: 12,
}));

const StyledFooter = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
});

const StyledLeftFooter = styled('div')({
  display: 'flex',
});

const StyledText = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    fontSize: '.625rem',
  },
}));

const LargeIcon = styled(CoronavirusRoundedIcon)(({ theme }) => ({
  marginBottom: '-1.1rem',
  marginRight: '-0.6rem',
  width: '9rem',
  height: '8rem',
}));

const Papers = ({ handleCountryChange, country, countries }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <section className="relative w-full top-20 z-30 mx-auto">
      <StyledPaper elevation={10}>
        <StyledFooter>
          <StyledLeftFooter>
            <LargeIcon />
            <StyledText>
              <Typography variant="h5" style={{ color: 'white' }}>
                The Covid-19 Tracker
              </Typography>
              <Typography
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                variant="h5"
                color="primary"
              >
                Click on a country name
              </Typography>
            </StyledText>
          </StyledLeftFooter>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <div class="flex flex-row">
            <div>
              <Typography variant="h5" style={{ color: 'white' }}>
                Last Updated:
              </Typography>
            </div>
            <div class="flex">
              <CalendarMonthRoundedIcon />
              <Typography color="textSecondary">
                {new Date().toLocaleString() + ''}
              </Typography>
            </div>
          </div>
        </StyledFooter>
      </StyledPaper>
      <br />
    </section>
  );
};

export default Papers;
