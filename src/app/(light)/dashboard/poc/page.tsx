import { Button, Card, Typography } from '@mui/material';

export default function POCHome() {
  return (
    <Card sx={{ p: 2, m: 3, alignSelf: 'center', width: 300 }}>
      <Typography variant="h6" mb={1}>
        POC Widget
      </Typography>
      <Button
        variant="contained"
        href="https://widget-poc-one.vercel.app/issue?access=5263b875-a216-473b-b4da-d674313c6642&gtwid=visajames&owner=kbooz&datamodel=12345-12345-12345-12345&claim={value:1,name:%20%27junior%27}&callback=https://mygateway.xyz/dashboard/poc"
      >
        Issue
      </Button>
    </Card>
  );
}
