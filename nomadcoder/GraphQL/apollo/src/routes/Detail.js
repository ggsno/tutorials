import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_BYID = gql`
{
  getById(id:$id){
    id
    title
    background_image
  }
}
`;

const Detail = () => {
  const { id } = useParams();
  
  const { loading, data } = useQuery(GET_BYID, {
    variables: { id }
  });
  if (loading) return "Loading ...";
  if (data?.getById)
    return (
      <div>
        <div>{data.getById.title}</div>
        <img src={data.getById.background_image} alt="ppap" />
        </div>
    );
};

export default Detail;
