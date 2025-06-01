import { MenuItem, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { ApplicationForm } from "../../types/application";

const LoanDetailsForm = () => {
  const {
    register,
    setValue,
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
        label="Loan Purpose"
        select
        {...register("loanPurpose")}
        value={watch("loanPurpose")}
        error={!!errors.loanPurpose?.message}
        helperText={errors.loanPurpose?.message}
        onChange={(e) => {
          const value = e.target.value;
          setValue("loanPurpose", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
          if (value === "vehicle") {
            setValue("depositAmount", 0, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }
        }}
      >
        <MenuItem value="vehicle">Vehicle</MenuItem>
        <MenuItem value="homeImprovement">Home Improvement</MenuItem>
        <MenuItem value="others">Others</MenuItem>
      </TextField>
      <TextField
        type="number"
        label="Loan Amount"
        {...register("loanAmount")}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          setValue("loanAmount", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
        error={!!errors.loanAmount?.message}
        helperText={errors.loanAmount?.message}
      />
      {watch("loanPurpose") !== "vehicle" && (
        <TextField
          type="number"
          label="Deposit"
          {...register("depositAmount")}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setValue("depositAmount", value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
          error={!!errors.depositAmount?.message}
          helperText={errors.depositAmount?.message}
        />
      )}
      <TextField
        type="number"
        label="Loan Term"
        select
        {...register("loanTerm")}
        helperText={errors.loanTerm?.message}
        error={!!errors.loanTerm?.message}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setValue("loanTerm", value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
        defaultValue={"1"}
      >
        <MenuItem value="1">1 year</MenuItem>
        <MenuItem value="2">2 years</MenuItem>
        <MenuItem value="3">3 years</MenuItem>
        <MenuItem value="4">4 years</MenuItem>
        <MenuItem value="5">5 years</MenuItem>
        <MenuItem value="6">6 years</MenuItem>
        <MenuItem value="7">7 years</MenuItem>
      </TextField>
    </div>
  );
};
export default LoanDetailsForm;
