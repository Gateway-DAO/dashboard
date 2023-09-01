import { Box, Stack } from "@mui/material";

export default function Header() {
  return <Box sx={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
  }}>
    <h1>Gateway</h1>
    <Stack direction="row" gap={2} justifyContent="center">
      <a href="/login">Login</a>
      <a href="/login">Login</a>
      <a href="/login">Login</a>
      <a href="/login">Login</a>
    </Stack>
    <Box sx={{ width: 24, height: 24, backgroundColor: "primary.main", justifySelf: "end" }}></Box>
  </Box>
}
