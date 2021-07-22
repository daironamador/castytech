import React, { useEffect, useMemo, useState } from "react";
import {
  Stack,
  Grid,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { obtenerArticulos } from "../products/api";
import ProductCard from "./ProductCard";
import CartDrawer from "./CartDrawer";
import { editCart } from "../selectors";
import { parseCurrency } from "../utils/currency";

const Store = () => {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, toggleCart] = useState(false);

  const total = useMemo(() => {
    return parseCurrency(
      cart.reduce(
        (total, product) =>
          total + product.price * product.cantidad,
        0
      )
    );
  }, [cart]);

  useEffect(() => {
    obtenerArticulos().then((res) => {
      setProducts(res);
    });
  }, []);

  const handleAddToCart = (product) => {
    setCart((cart) => {
      const isInCart = cart.some(
        (item) => item.id === product.id
      );
      if (isInCart) {
        return cart.map(
          (
            item /* Devuelvo un nuevo array con los elementos */
          ) =>
            item.id === product.id
              ? {
                  ...item,
                  cantidad: item.cantidad + 1,
                }
              : item
        );
      }
      return [
        ...cart,
        product,
      ]; /* Le devuelve este state al array  */
    });
  };

  const handleEditCartCantidad = (product, action) => {
    setCart(editCart(product, action));
  };
  return products ? (
    <>
      <Stack spacing={6}>
        <Grid
          gridGap={8}
          templateColumns={{
            base: "repeat(auto-fill, minmax(240px, 1fr))",
            sm: "repeat(auto-fill, minmax(360px, 1fr))",
          }}
        >
          {products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => {
                  handleAddToCart(product);
                }}
              />
            );
          })}
        </Grid>
        {cart.length && (
          /* encodeURIComponent pone bien el text para que viaje atravez de una url cambia astericos etc */
          <Flex
            position="sticky"
            bottom={0}
            justifyContent="center"
            paddingY={4}
            alignItems="center"
          >
            <Button
              width={{ base: "100%", sm: "fit-content" }}
              colorScheme="primary"
              boxShadow="2xl"
              size="lg"
              onClick={() => {
                toggleCart(true);
              }}
            >
              <Stack
                direction="row"
                spacing={6}
                alignItems="center"
              >
                <Stack
                  spacing={3}
                  direction="row"
                  alignItems="center"
                >
                  <Text fontSize="md">Ver Pedido</Text>
                  <Text
                    backgroundColor="rgba(0, 0, 0, 0.25)"
                    paddingX={2}
                    paddingY={1}
                    fontWeight="500"
                    color="gray.100"
                    fontSize="xs"
                    borderRadius="sm"
                  >
                    {cart.reduce((acc, item) => {
                      return acc + item.cantidad;
                    }, 0)}
                    {" items"}
                  </Text>
                </Stack>
                <Text fontSize="md">{total}</Text>
              </Stack>
            </Button>
          </Flex>
        )}
      </Stack>
      <CartDrawer
        items={cart}
        onIncrement={(product) =>
          handleEditCartCantidad(product, "increment")
        }
        onDecrement={(product) => {
          handleEditCartCantidad(product, "decrement");
        }}
        isCartOpen={isCartOpen}
        onClose={() => toggleCart(false)}
      />
    </>
  ) : null;
};

export default Store;
