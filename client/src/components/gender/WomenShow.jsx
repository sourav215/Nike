import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, GridItem } from "@chakra-ui/react";

import AllProduct from "../Products/AllProduct";
import { Loading } from "../loading/Loading";

const WomenShow = ({ women }) => {
  const loading = useSelector((state) => state.AppReducer.notLoading);
  if (loading === false) {
    return <Loading />;
  }
  return (
    <Grid
      gap={["10px", "10px", "20px", "20px", "20px"]}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
      justifyContent="flex-end"
    >
      {women?.map((el, i) => (
        <GridItem>
          <AllProduct key={i} {...el} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default WomenShow;
