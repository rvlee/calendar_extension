import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

export default ({ value, keyVal, onChange, canEdit }) => {
  let chipComp = <div />
  if (Array.isArray(value)) {
    const chipFormat = value.map((val, index) => {
      return {
        key: index,
        label: val.email,
      }
    })
    const handleDelete = (deleteChip) => {
      const newChipData = value.filter((val, idx) => idx !== deleteChip.key)
      onChange(keyVal, newChipData);
    }
    chipComp = chipFormat.map((chip) => {
      return (
        <Chip
          key={chip.key}
          label={chip.label}
          onDelete={canEdit ? () => {handleDelete(chip)} : undefined}
        />
      );
    });
  }
  return (
    <Paper className="chip-wrapper">
      {chipComp}
      {canEdit ? <button>Plus</button> : null}
    </Paper>
  );
}