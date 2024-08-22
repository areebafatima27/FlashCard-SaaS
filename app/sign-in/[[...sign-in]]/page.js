import { SignIn } from "@clerk/nextjs";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Link,
} from "@mui/material";

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static" sx={{ backgroundColor: "#7f9cdb;" }}>
        <Toolbar>
          <Typography
            variant="h6"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              flexGrow: 1,
              mt: 2,
            }}
            className="appbar"
          >
            FlashCard SaaS
          </Typography>
          <Button color="inherit">
            <Link href="/sign-in" passHref>
              SignIN
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              SignUp
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="10vh"
      >
        <Typography variant="h4">Sign In</Typography>
      </Box>
      <SignIn />
    </Container>
  );
}
