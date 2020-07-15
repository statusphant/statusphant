import React from "react";
import { NextPage } from "next";

import { Button } from "@chakra-ui/core";

const Home: NextPage = () => {
  return (
    <div>
      Home Page
      <Button variantColor="green" border="none">
        Button
      </Button>
    </div>
  );
};

export default Home;
