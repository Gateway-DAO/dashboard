import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export default function BooleanProperty() {
  return (
    <RadioGroup>
      <FormControlLabel value="true" control={<Radio />} label="True" />
      <FormControlLabel value="false" control={<Radio />} label="False" />
    </RadioGroup>
  );
}
