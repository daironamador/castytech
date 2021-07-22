import React, { useMemo, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Stack,
  Text,
  Button,
  Link,
  Image,
} from "@chakra-ui/react";

import { parseCurrency } from "../utils/currency";

const CartDrawer = ({
  items,
  isCartOpen,
  onClose,
  onDecrement,
  onIncrement,
}) => {
  const total = useMemo(() => {
    return parseCurrency(
      items.reduce(
        (total, product) =>
          total + product.price * product.cantidad,
        0
      )
    );
  }, [items]);

  const text = useMemo(() => {
    /* Solo se va a renderizar cuando cambie el card */
    return items
      .reduce(
        (message, product) =>
          message.concat(
            `* ${product.title} ${
              product.cantidad > 1
                ? ` (x${product.cantidad})`
                : ""
            } - ${parseCurrency(
              product.price * product.cantidad
            )}\n`
          ),
        ""
      )
      .concat(`\nTotal: ${total}`);
  }, [items, total]);

  useEffect(() => {
    if (items.length === 0) {
      onClose();
    }
  }, [items.length, onClose]);

  return (
    <Drawer
      isOpen={isCartOpen}
      placement="right"
      onClose={onClose}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontSize="2xl">
          <Stack direction="row">
            <Text>Tu pedido</Text>
            <Text color="gray.400">({items.length})</Text>
          </Stack>
        </DrawerHeader>

        <DrawerBody>
          {items.length >= 1 ? (
            <Stack spacing={4} divider={<Divider />}>
              {items.map((product) => {
                return (
                  <Stack direction="row" key={product.id}>
                    <Stack width="100%">
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        fontWeight="500"
                        alignItems="center"
                      >
                        <Text fontSize="lg">
                          {product.title}
                        </Text>
                        <Text>
                          {parseCurrency(
                            product.price * product.cantidad
                          )}
                        </Text>
                      </Stack>
                      <Stack direction="row">
                        <Button
                          borderRadius="999"
                          colorScheme="primary"
                          size="xs"
                          onClick={() => {
                            onDecrement(product);
                          }}
                        >
                          -
                        </Button>
                        <Text fontWeight="500">
                          {product.cantidad}
                        </Text>
                        <Button
                          colorScheme="primary"
                          borderRadius="999"
                          size="xs"
                          onClick={() => {
                            onIncrement(product);
                          }}
                        >
                          +
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          ) : (
            <Text color="gray.400">
              No hay productos en tu carrito
            </Text>
          )}
        </DrawerBody>

        {items.length >= 1 && (
          <DrawerFooter>
            <Stack width="100%" spacing={4}>
              <Divider></Divider>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                fontWeight="500"
                fontSize="lg"
              >
                <Text>Total</Text>
                <Text>{total}</Text>
              </Stack>
              <Button
                width="100%"
                as={Link}
                colorScheme="whatsapp"
                href={`https://wa.me/+5493364549410?text=${encodeURIComponent(
                  text
                )}`}
                isExternal
                leftIcon={
                  <Image src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff" />
                }
              >
                Completar pedido
              </Button>
            </Stack>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
