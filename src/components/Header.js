import React from "react";
import {
  Box,
  Stack,
  Image,
  Heading,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";
import { INFORMATION } from "../app/constants";

const Header = () => {
  return (
    <Stack spacing={8} marginBottom={8}>
      <Stack marginBottom={4} spacing={2}>
        <Image
          src={INFORMATION.banner}
          height="100%"
          maxHeight={64}
          borderRadius="lg"
          objectFit="cover"
        />
        <Stack
          direction={{ base: "column", sm: "row" }}
          alignItems="center"
          spacing={{ base: 3, sm: 6 }}
        >
          <Box
            borderRadius="9999"
            padding={1}
            backgroundColor="white"
            marginTop={{ base: -12, sm: -16 }}
            minWidth={{ base: 24, sm: 32 }}
          >
            <Image
              width={{ base: 24, sm: 32 }}
              height={{ base: 24, sm: 32 }}
              borderRadius="9999"
              src={INFORMATION.avatar}
            />
          </Box>
          <Stack
            paddingTop={{ base: 0, sm: 2 }}
            spacing={2}
            textAlign={{ base: "center", sm: "left" }}
            alignItems={{
              base: "center",
              sm: "flex-start",
            }}
          >
            <Heading>{INFORMATION.title}</Heading>
            <Text
              color="gray.500"
              fontSize="md"
              fontWeight="500"
            >
              {INFORMATION.description}
            </Text>
            <Stack direction="row">
              {INFORMATION.social.map((social) => {
                return (
                  <Link
                    key={social.name}
                    isExternal
                    href={social.url}
                  >
                    <Flex
                      width={10}
                      height={10}
                      borderRadius={9999}
                      backgroundColor="primary.500"
                      color="white"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                      />
                    </Flex>
                  </Link>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
