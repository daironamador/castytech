import React from "react";
import { Container } from "@chakra-ui/react";
const Layout = ({ children }) => {
  return (
    <Container
      maxWidth="container.xl"
      backgroundColor="white"
      borderRadius="sm"
      marginY={4}
    >
      {children}
    </Container>
  );
};

export default Layout;
