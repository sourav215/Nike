import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

function DebitCardDetails({cardState, handleChange, handlePayment}) {
  

  return (
    <>
      <Text fontSize={"24px"} fontWeight="600">
        Card Details
      </Text>
      <Box fontSize={"20px"} w={"300px"} fontWeight="400">
        <Box>
          <Text marginTop="10px" marginBottom="5px">
            Debit card number
          </Text>
          <Input
            type={"text"}
            placeholder={"__ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __"}
            name={"number"}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Text marginTop="10px" marginBottom="5px">
            Name on Card
          </Text>
          <Input
            type={"text"}
            placeholder={"FULL NAME"}
            name={"name"}
            onChange={handleChange}
          />
        </Box>
        <Flex gap={"30px"}>
          <Box>
            <Text marginTop="10px" marginBottom="5px">
              Expiry Date
            </Text>
            <Input
              type="text"
              name={"date"}
              onChange={handleChange}
              placeholder={"MM/YY"}
            />
          </Box>
          <Box>
            <Text marginTop="10px" marginBottom="5px">
              CVV
            </Text>
            <Input
              type={"text"}
              name={"cvv"}
              onChange={handleChange}
              placeholder={"CVV"}
            />
          </Box>
        </Flex>
      </Box>
      <Box>
        <Input
          as={"button"}
          type={"submit"}
          h={"60px"}
          bg={"#edf2f7"}
          color={"black"}
          border={`1px solid #cecdce`}
          borderRadius={"50px"}
          w={"100%"}
          fontSize={"17px"}
          mt={"20px"}
          _hover={{ borderColor: "black" }}
          onClick={handlePayment}
        >
          Place Order
        </Input>
      </Box>
    </>
  );
}
export default DebitCardDetails;
