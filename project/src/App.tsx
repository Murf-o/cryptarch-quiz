import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

function App() {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={6}>2</Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
