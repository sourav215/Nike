import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Container,
  Heading,
  useToast,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { BtnCheckout } from "../../components/cart/BtnCheckout";

import CartShow from "../../components/cart/CartShow";

import { OrderSummary } from "../../components/order/OrderSummary";

import { getCartData } from "../../redux/AppReducer/action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useEffect } from "react";
import { Loading } from "../../components/loading/Loading";
import { setToast } from "../../utilties/toastfun";

const Cart = () => {
  const navigate = useNavigate();
  const [dataAvail, setDataAvail] = useState(true);
  const CartData = useSelector((state) => state.AppReducer.cart);

  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  const toast = useToast();
  const handleClick = () => {
    if (isAuth) {
      setToast(toast, "Checkout", "info");
      navigate("/checkout");
    } else {
      setToast(toast, "Please Login first", "error");
      navigate("/checkout");
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  useEffect(
    () => {
      if (CartData.length) {
        setDataAvail(true);
      } else {
        setDataAvail(false);
      }
    },
    [CartData],
    setDataAvail
  );

  const loading = useSelector((state) => state.AppReducer.notLoading);

  if (loading === false) {
    return <Loading />;
  }
  return (
    <>
      {dataAvail ? (
        <Box
          display={"flex"}
          justifyContent="space-around"
          flexWrap="wrap"
          marginTop="30px"
          marginBottom={"50px"}
        >
          <Box marginTop={"30px"} marginButtom={"30px"}>
            {CartData?.map((e, i) => (
              <CartShow key={i} {...e} />
            ))}
          </Box>

          <Box>
            <OrderSummary key={CartData?._id} CartData={CartData} />
            <BtnCheckout onClick={handleClick} />
          </Box>
        </Box>
      ) : (
        <Container width={"100%"} pb={"200px"}>
          <Box textAlign="center" mt={"50px"}>
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3zGfbc45UO1GBzJRX4OiYHAx4ChsDRDlTyg&usqp=CAU"
              }
              m={"auto"}
              height={"150px"}
            />
            <Heading fontSize={"22px"} mt="10px">
              Oops!
            </Heading>
            <Text mt="10px">Looks like there is no item in your cart yet.</Text>
            <Button
              mt="10px"
              background={"grey"}
              color={"white"}
              _hover={{ backgroundColor: "black" }}
              _active={{ backgroundColor: "black" }}
              onClick={() => navigate("/products")}
            >
              ADD PRODUCTS
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Cart;
