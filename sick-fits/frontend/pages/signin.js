import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default function signinPage() {
  return (
    <Grid>
      <SignIn />
      <SignUp />
    </Grid>
  );
}
