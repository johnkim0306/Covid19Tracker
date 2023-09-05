import * as React from 'react';
// import { Table, Paper, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination, StylesProvider } from '@material-ui/core';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';
import "./DataTable.scss";
import numeral from "numeral";  

const columns = [
  { id: 'code', label: 'ISO\u00a0Code', algin: 'center' },
  { id: 'country', label: 'Country' },
  { id: 'cases', label: 'Cases', align: 'left', format: (value) => value.toLocaleString('en-US') },
  { id: 'recovered', label: 'Recovered', align: 'center' },
  { id: 'deaths', label: 'Deaths', align: 'center' }
];

const useStyles = makeStyles(theme => ({
  paper: {
    overflow: 'hidden',
    width: '100%'
  },
}));

const formatNumber = (value) => numeral(value).format('0,0');

export default function DataTable({ countries }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.paper} >
      <TableContainer sx={{ maxHeight: 1220, width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {countries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((country) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={country.country}>
                    <TableCell align="center" rowSpan={1} className="table-country" style={{ backgroundImage: `url(${country.countryInfo.flag})`}}>
                        {country.countryInfo.iso2}
                    </TableCell>
                    <TableCell align="left">
                        <strong>{country.country}</strong>
                    </TableCell>
                    <TableCell align="left">
                        {formatNumber(country.casesPerOneMillion)}
                    </TableCell>
                    <TableCell align="right">
                        {formatNumber(country.recoveredPerOneMillion)}
                    </TableCell>
                    <TableCell align="center">
                        {formatNumber(country.deathsPerOneMillion)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
