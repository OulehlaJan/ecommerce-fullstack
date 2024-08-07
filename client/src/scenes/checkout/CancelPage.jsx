import { useHistory } from "react-router-dom";
import { Box, Button, Alert, AlertTitle } from "@mui/material";

const CancelPage = () => {
  const history = useHistory();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      m="20px 15px 0px 15px"
      height="100vh"
    >
      <Alert
        severity="error"
        sx={{
          p: {
            md: "100px 190px 100px 190px",
            xs: "100px 20px 100px 20px",
          },
          borderRadius: "10px",
          fontSize: "18px",
        }}
      >
        <AlertTitle>Oops! Payment Canceled</AlertTitle>
        <p>
          Looks like you had second thoughts -
          <strong> No worries and grab those goodies!</strong>
          <br />
        </p>
      </Alert>
      <Box>
        <Button
          onClick={() => history.push("/checkout")}
          variant="contained"
          color="primary"
          sx={{
            p: "10px 25px",
            mt: "25px",
            backgroundColor: "#222222",
            color: "white",
            borderRadius: "3px",
            minWidth: "150px",
            "@media (min-width: 960px)": {
              "&:hover": {
                backgroundColor: "rgba(34, 34, 34, 0.05)",
                color: "black",
              },
              "&:active": {
                backgroundColor: "#222222",
                color: "white",
              },
            },
          }}
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
};

export default CancelPage;
