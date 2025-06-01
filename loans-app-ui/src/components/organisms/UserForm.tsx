import { MenuItem, TextField } from "@mui/material";

import { useFormContext } from "react-hook-form";
import type { ApplicationForm } from "../../types/application";

const UserForm = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationForm>();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        margin: 2,
        padding: 2,
      }}
    >
      <TextField
        {...register("firstName")}
        label="First Name"
        helperText={errors.firstName?.message}
        error={!!errors.firstName?.message}
      />
      <TextField
        {...register("lastName")}
        label="Last Name"
        helperText={errors.lastName?.message}
        error={!!errors.lastName?.message}
      />

      <TextField
        {...register("employmentStatus")}
        label="Employment Status"
        select
        error={!!errors.employmentStatus?.message}
        value={watch("employmentStatus")}
        helperText={errors.employmentStatus?.message}
      >
        <MenuItem value="employed">Employed</MenuItem>
        <MenuItem value="unemployed">Unemployed</MenuItem>
        <MenuItem value="self-employed">Self-Employed</MenuItem>
      </TextField>

      {watch("employmentStatus") === "employed" && (
        <TextField
          {...register("companyName")}
          label="Company Name"
          error={!!errors.companyName?.message}
          disabled={watch("employmentStatus") !== "employed"}
          helperText={errors.companyName?.message}
        />
      )}
    </div>
  );
};
export default UserForm;
