import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/AuthReducer/action";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { setToast } from "../../utilties/toastfun";
export default function Login() {
  const toast = useToast();
  const mytoast = useToast({ position: "top" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, isError } = useSelector((store) => store.AuthReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const payload = {
      email,
      password,
    };
    if (email && password) {
      dispatch(loginUser(payload, mytoast, navigate));
    } else {
      setToast(toast, "Please fill the Valid Details", "error");
    }
  };

  if (isAuth) {
    return navigate("/");
  }
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1617611413968-537a2ba4986d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button bgColor={"black"} color={"white"} onClick={handleSubmit}>
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Not Have Account{" "}
              <Link color={"blue.400"}>
                <RouterLink to="/signup">Signup</RouterLink>
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
