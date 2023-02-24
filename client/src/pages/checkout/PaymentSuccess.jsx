import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();
  const {orderId}  = useParams();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });
  return (
    <Box
      marginTop="100px"
      marginBottom={"200px"}
      textAlign="center"
      py={10}
      px={6}
    >
      <CheckCircleIcon boxSize={"70px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2} fontSize="50px">
        Payment Successful
      </Heading>
      <Text color={"gray.500"}>
        Order Id: {orderId}
      </Text>
    </Box>
  );
}
export default PaymentSuccess;
