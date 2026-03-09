import React from "react";
import { Chip } from "@mui/material";

const Definition = ({ title, description }) => {
  if (!description) return null;
  return (
    <Chip color="secondary" label={description} sx={{ mr: 0.5, mt: 0.5 }} />
  );
};

export default Definition;
