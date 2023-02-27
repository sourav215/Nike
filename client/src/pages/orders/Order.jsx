import {
  Box,
  Divider,
  Flex,
  Text,
  Image,
  Button,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import axios from "axios";
import { Loading } from "../../components/loading/Loading";

import { useNavigate } from "react-router-dom";

function Order() {
  const [isLoading, setIsLoading] = useState(false);

  const [ordersArr, setOrdersArr] = useState([]);
  const navigate = useNavigate();

  const handleOrdersGetRequest = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: "GET",
        url: "/orders",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setOrdersArr(data);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleOrdersGetRequest();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (ordersArr.length == 0) {
    return (
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
          <Text mt="10px">Looks like there is no item in your order yet.</Text>
          <Button
            mt="10px"
            background={"grey"}
            color={"white"}
            _hover={{ backgroundColor: "black" }}
            _active={{ backgroundColor: "black" }}
            onClick={() => navigate("/products")}
          >
            Order Now
          </Button>
        </Box>
      </Container>
    );
  }
  return (
    <>
    <Box margin="30px auto">
      <Text textAlign={"center"} fontSize="24px" fontWeight="bold" color="gray.500" >My Orders</Text>
    </Box>
    <Box marginTop="50px" marginBottom="50px">
      {ordersArr?.map(
        ({ img, title, orderId, price, count, size, color, productId }) => {
          return (
            <>
              <Flex
                w="90%"
                margin={"auto"}
                marginTop="20px"
                justifyContent="left"
                flexWrap="wrap"
                onClick={() => {
                  navigate(`/products/${productId}`);
                }}
              >
                <Box
                  w={["80px", "80px", "150px", "150px", "150px"]}
                  h={["80px", "80px", "150px", "150px", "150px"]}
                >
                  <Image h={"85%"} src={img[0]} />
                </Box>
                <Box>
                  <Text fontSize={["12px", "16px", "24px"]} fontWeight="600">
                    {title}
                  </Text>
                  <Text fontSize={"12px"}>
                    <Text as="span" fontSize={"12px"} fontWeight="600">
                      OrderId :{" "}
                    </Text>
                    {orderId}
                  </Text>
                  <Text fontSize={"15px"}>
                    <Text as="span" fontSize={"16px"} fontWeight="600">
                      Price{" "}
                    </Text>
                    ₹ {+price * +count}
                  </Text>
                  <Text fontSize={"14px"}>
                    <Text as="span" fontSize={"14px"} fontWeight="600">
                      Size:{" "}
                    </Text>
                    {size[0]}
                  </Text>
                  <Text fontSize={"14px"}>
                    <Text as="span" fontSize={"14px"} fontWeight="600">
                      Color:{" "}
                    </Text>
                    {color}
                  </Text>
                </Box>
              </Flex>
              <Divider />
            </>
          );
        }
      )}
    </Box>
    </>
  );
}
export default Order;

//  const Order = () => {
//   const token = useSelector((state) => state.authReducer.token);
//   const [isLoading, setIsLoading] = useState(false);

//   const [data, setData] = useState([]);

//   const handleOrdersGetRequest = async (token) => {
//     try {
//       setIsLoading(true);
//       let { data } = await axios.get("/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setData(data);
//       setIsLoading(false);
//     } catch (error) {
//       // console.log(error);
//       setIsLoading(false);

//     }
//   };

//   useEffect(() => {
//     // handleOrdersGetRequest(token);
//   }, [token]);

// //   if (data.length === 0) {
// //     return (
// //       <Box>
// //         <Center h={"40vh"}>
// //           <Text fontSize={"20px"}>Your orders will be displayed here.</Text>
// //         </Center>
// //       </Box>
// //     );
// //   }
// return (
//     <Box>
//       <Center h={"40vh"}>
//         <Text fontSize={"20px"}>Your orders will be displayed here.</Text>
//       </Center>
//     </Box>
//   );

// };
// export default Order;
