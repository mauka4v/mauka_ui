import React, { useEffect, useState } from "react";
import { Box, TabList, TabPanel, TabPanels, Tabs, Tab } from "@chakra-ui/react";
import WatchList from "./WatchList";
import BackTest from "./BackTest";
import SignalComp from "./SignalComp";
import { useSelector, useDispatch } from "react-redux";

function MainContent() {
  const [tabIndex, setTabIndex] = useState(0);
  const defaultIndex = 0;

  const tabListMap = {
    Signals: (active) => <SignalComp Index={0} Active={active} />,
    WatchList: (active) => <WatchList Index={1} Active={active} />,
    BackTest: (active) => <BackTest Index={2} Active={active} />,
  };

  useEffect(() => {}, [defaultIndex]);

  const tabComps = Object.keys(tabListMap).map((mapKey, index) => (
    <Tab key={index} ActiveTabIdx={tabIndex}>
      {mapKey}
    </Tab>
  ));
  const tabPanelComps = Object.values(tabListMap).map((value, index) => (
    <TabPanel key={index}> {value(tabIndex)} </TabPanel>
  ));

  const onTabClicked = (e) => setTabIndex(e);

  return (
    <Box position="relative" h="100vh">
      <Tabs defaultIndex={defaultIndex} onChange={onTabClicked} align="center">
        <TabList>{tabComps}</TabList>
        <TabPanels>{tabPanelComps}</TabPanels>
      </Tabs>
    </Box>
  );
}

export default MainContent;
