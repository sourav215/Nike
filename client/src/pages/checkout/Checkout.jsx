import { Box, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import { OrderSummary } from "../../components/order/OrderSummary";

import { setToast } from "../../utilties/toastfun";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import axios from "axios";

import { getCartData } from "../../redux/AppReducer/action";
import DebitCardDetails from "../../components/order/DebitCardDetails";

const Checkout = () => {
  const CartData = useSelector((state) => state.AppReducer.cart);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const [cardState, setCardState] = useState({
    number: "",
    name: "",
    date: "",
    cvv: "",
  });
  const handleChange = (e) => {
    setCardState({ ...cardState, [e.target.name]: e.target.value });
  };
  const [checkoutForm, setCheckoutForm] = useState({});

  const toast = useToast({ position: "top" });
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (
      !checkoutForm.firstName &&
      !checkoutForm.lastName &&
      !checkoutForm.email &&
      !checkoutForm.password &&
      !checkoutForm.gender
    ) {
      setToast(toast, "Please fill the Valid Details", "error");
      return;
    }
    if (
      !cardState.number ||
      !cardState.name ||
      !cardState.date ||
      !cardState.cvv
    ) {
      setToast(toast, "Enter Valid Card Details", "error");
      return;
    }
    try {
      setIsLoading(true);
      const result = await axios({
        method: "POST",
        url: "/orders",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify({ ...cardState }),
      });
      setIsLoading(false);
      // console.log(result.data);
      if (result.data.orderId) {
        toast({
          title: `Payment Successful`,
          status: "success",
          isClosable: true,
        });
        return navigate(`/success/${result.data.orderId}`);
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: `Payment Fail`,
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    dispatch(getCartData());
    setTotalPrice(CartData.reduce((a, ac) => a + ac.price, 0));
  }, [dispatch, setTotalPrice]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-around"}
        margin="30px"
        marginTop="30px"
        marginBottom="70px"
        flexWrap="wrap"
      >
        <Box marginTop="30px">
          <CheckoutForm
            checkoutForm={checkoutForm}
            setCheckoutForm={setCheckoutForm}
          />
        </Box>

        <Box>
          <OrderSummary key={CartData._id} CartData={CartData} />

          <DebitCardDetails
            cardState={cardState}
            handleChange={handleChange}
            handlePayment={handlePayment}
          />
        </Box>
      </Box>
    </>
  );
};

export default Checkout;
