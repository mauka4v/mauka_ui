import React from "react";
import {
  Box,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import MainContent from "../components/rootComp/MainContent";
import SideBar from "../components/rootComp/SideBar";
import Header from "../components/rootComp/Header";

function HomePage() {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();
  console.log("Login: ", isAuthenticated);
  React.useEffect(() => {
    console.log("------- Authenticated -----", isAuthenticated);
    if (!isAuthenticated) {
      loginWithPopup();
    } else {
      JSON.stringify(user, null, 2);
    }
    console.log("Logged In User: ", JSON.stringify(user, null, 2));
  }, [isAuthenticated]);
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      {/* <GridItem
      as="aside"
      colSpan={{base: 6, lg: 2, xl: 1}}
      bgColor="blue.100"
      p={{base: "1rem", lg:"1.5rem"}}
      minHeight={{lg:"100vh"}}
      >
        <SideBar/>
        
    </GridItem> */}
      <GridItem>
        <div></div>
      </GridItem>

      <GridItem as="main" colSpan="5" p="1rem">
        <Flex>
          <Header />

          <MainContent />
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default HomePage;
