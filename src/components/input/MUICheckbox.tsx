import React from 'react';

interface Props {
  value: string;
  name: string;
  onChange: (name: string, value: string) => void;
}

const MUICheckbox = ({ value, name, onChange }: Props) => {
  const isChecked = value === 'tYES';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.checked ? 'tYES' : 'tNO');
  };

  return (
    <input type="checkbox" name={name} value={value} checked={isChecked ?? false} onChange={handleChange} />
  );
};

export default MUICheckbox;