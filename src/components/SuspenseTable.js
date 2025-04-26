// src/components/SuspenseTable.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Save, Add } from '@mui/icons-material';
import * as XLSX from 'xlsx';

const currencyCodes = ['USD', 'ZWG', 'ZAR', 'GBP', 'EUR', 'AUD', 'BWP'];

const SuspenseTable = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Suspense Account 1', currency: 'USD', balance: 0, days: Array(31).fill('X') },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const addAccount = () => {
    const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
    setAccounts([
      ...accounts,
      {
        id: newId,
        name: `Suspense Account ${newId}`,
        currency: 'USD',
        balance: 0,
        days: Array(31).fill('X'),
      },
    ]);
  };

  const updateAccount = (id, field, value) => {
    setAccounts(
      accounts.map(account =>
        account.id === id ? { ...account, [field]: value } : account
      )
    );
  };

  const updateDayStatus = (accountId, dayIndex, value) => {
    setAccounts(
      accounts.map(account =>
        account.id === accountId
          ? {
              ...account,
              days: account.days.map((day, idx) =>
                idx === dayIndex ? value : day
              ),
            }
          : account
      )
    );
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ['Suspense Account Tracker', '', '', '', '', '', '', '', ''],
      ['Generated on:', currentDate.toLocaleDateString(), '', '', '', '', '', '', ''],
      [''],
      ['Account Name', 'Currency', 'Opening Balance', ...Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`)],
      ...accounts.map(account => [
        account.name,
        account.currency,
        account.balance,
        ...account.days,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Suspense Accounts');
    XLSX.writeFile(wb, `Suspense_Accounts_${currentDate.toISOString().split('T')[0]}.xlsx`);
  };

  useEffect(() => {
    // Auto-save or daily update logic would go here
    // Could connect to a backend API
  }, [accounts]);

  return (
    <TableContainer component={Paper} sx={{ margin: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Suspense Account</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Balance</TableCell>
            {Array.from({ length: 31 }, (_, i) => (
              <TableCell key={i + 1}>Day {i + 1}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map(account => (
            <TableRow key={account.id}>
              <TableCell>
                <TextField
                  value={account.name}
                  onChange={e => updateAccount(account.id, 'name', e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  select
                  value={account.currency}
                  onChange={e => updateAccount(account.id, 'currency', e.target.value)}
                  fullWidth
                >
                  {currencyCodes.map(code => (
                    <MenuItem key={code} value={code}>
                      {code}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={account.balance}
                  onChange={e => updateAccount(account.id, 'balance', parseFloat(e.target.value))}
                  fullWidth
                />
              </TableCell>
              {account.days.map((day, dayIndex) => (
                <TableCell key={dayIndex}>
                  <Tooltip title={day === 'X' ? 'No movement' : 'Movement detected'}>
                    <IconButton
                      onClick={() =>
                        updateDayStatus(
                          account.id,
                          dayIndex,
                          day === 'X' ? 'Y' : 'X'
                        )
                      }
                      sx={{
                        backgroundColor: day === 'X' ? '#f44336' : '#4caf50',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: day === 'X' ? '#d32f2f' : '#388e3c',
                        },
                      }}
                    >
                      {day}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={addAccount}
        >
          Add Account
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Save />}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
      </div>
      <div style={{ textAlign: 'center', padding: '16px', color: '#757575' }}>
        <p>Powered by AFC Commercial Bank</p>
        <p>Designed by Lings</p>
      </div>
    </TableContainer>
  );
};

export default SuspenseTable;
