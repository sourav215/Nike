import {
  Box,
  Flex,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
  Checkbox,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import WomenShow from "../../components/gender/WomenShow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getWomenData } from "../../redux/AppReducer/action";
function Women() {
  const dispatch = useDispatch();
  const women = useSelector((state) => state.AppReducer.women);

  const [categoryState, setCategoryState] = useState({
    category: {
      Cloths: false,
      Shoes: false,
    },
    color: {
      White: false,
      Black: false,
      Blue: false,
      Red: false,
    },
    sort: "",
  });

  const returnFilteredData = () => {
    let filteredProd = women
      .filter((ele) => {
        let allEmpty = true;
        for (let k in categoryState.category) {
          if (categoryState.category[k]) {
            allEmpty = false;
          }
        }
        if (allEmpty) return true;

        for (let k in categoryState.category) {
          if (categoryState.category[k] && ele.category == k) {
            return true;
          }
        }
      })
      .filter((ele) => {
        let allEmpty = true;
        for (let k in categoryState.color) {
          if (categoryState.color[k]) {
            allEmpty = false;
          }
        }
        if (allEmpty) return true;

        for (let k in categoryState.color) {
          if (categoryState.color[k] && ele.color == k) {
            return true;
          }
        }
      })
      .sort((a, b) => {
        if (categoryState.sort == "asc") {
          return a.price - b.price;
        } else if (categoryState.sort == "desc") {
          return b.price - a.price;
        } else {
          return 0;
        }
      });
    // console.log("filteredProd", filteredProd);
    return filteredProd;
  };
  const handleSorting = (e) => {
    setCategoryState({
      ...categoryState,
      sort: e.target.value,
    });
  };
  const handleCategory = (e) => {
    setCategoryState({
      ...categoryState,
      category: {
        ...categoryState.category,
        [e.target.name]: e.target.checked,
      },
    });
  };
  const handleColor = (e) => {
    setCategoryState({
      ...categoryState,
      color: { ...categoryState.color, [e.target.name]: e.target.checked },
    });
  };

  useEffect(() => {
    dispatch(getWomenData());
  }, []);
  return (
    <Box
      borderTop="1px solid"
      borderColor="gray.300"
      py="2.5rem"
      fontSize="0.875rem"
    >
      <Box
        maxW="85rem"
        marginX="auto"
        pb="1rem"
        mb="1.5rem"
        px={{ base: "1rem", lg: "0.5rem" }}
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        <Flex
          justify="space-between"
          flexWrap="wrap"
          alignItems="start"
          gap={"10px"}
        >
          <Box w={{ base: "100%", lg: 1 / 5 }} mb={{ base: "1.5rem", lg: "0" }}>
            <Accordion allowMultiple>
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton fontWeight="semibold">
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={"20px"}
                        >
                          Category
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" fontWeight="semibold" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Stack spacing={2} direction="column">
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          name="Cloths"
                          onChange={handleCategory}
                        >
                          Cloths
                        </Checkbox>
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          name="Shoes"
                          onChange={handleCategory}
                        >
                          Shoes
                        </Checkbox>
                      </Stack>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={"20px"}
                          fontWeight="semibold"
                        >
                          Color
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Stack spacing={2} direction="column">
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          name="White"
                          onChange={handleColor}
                        >
                          White
                        </Checkbox>
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          name="Black"
                          onChange={handleColor}
                        >
                          Black
                        </Checkbox>
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          name="Blue"
                          onChange={handleColor}
                        >
                          Blue
                        </Checkbox>
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          name="Red"
                          onChange={handleColor}
                        >
                          Red
                        </Checkbox>
                      </Stack>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </Accordion>
          </Box>
          <Box
            w={{ base: "100%", lg: 3.9 / 5 }}
            mb={{ base: "1.5rem", lg: "0" }}
          >
            <Flex
              justify="space-between"
              flexWrap="wrap"
              alignItems="end"
              marginBottom="20px"
            >
              <Text fontSize="24px">
                Search Results ({returnFilteredData().length})
              </Text>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  w="225px"
                  textAlign="left"
                  borderRadius="0px"
                  fontSize="20px"
                  bg="white"
                >
                  Sort By
                </MenuButton>
                <MenuList borderRadius="0px" fontSize="20px">
                  <MenuItem value="desc" onClick={handleSorting}>
                    Price: High to Low
                  </MenuItem>
                  <MenuItem value="asc" onClick={handleSorting}>
                    Price: Low to High
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <WomenShow women={returnFilteredData()} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
export default Women;
