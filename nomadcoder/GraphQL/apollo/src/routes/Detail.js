import React from "react";
import { gql, useQuery } from "@apollo/client";
import Movie from "../components/Movie";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const GET_BYID = gql`
{
  getById(id:${id}){
    id
    title
    background_image
  }
}
`;
  const { loading, error, data } = useQuery(GET_BYID);
  if (loading) return "Loading ...";
  console.log(data.getById.background_image);
  if (data?.getById)
    return (
      <div>
        <div>{data.getById.title}</div>
        <img src={data.getById.background_image} alt="ppap" />
        </div>
    );
};

export default Detail;
