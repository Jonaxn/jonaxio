import React from "react";
import { userStringParam } from "../../utils/utils";

const TeamPage = () => {
  const member_id = userStringParam("id");
  return <div>{member_id}: i'm team here</div>;
};

export default TeamPage;
