import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useTranslation } from '../../common/components/LocalizationProvider';

import Row from './Row';

const CollapsibleTable = ({ rows }) => {
  const t = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{t('userEmail')}</TableCell>
            <TableCell>{t('deviceContact')}</TableCell>
            <TableCell>{t('userExpirationTime')}</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.userName} item={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CollapsibleTable;
