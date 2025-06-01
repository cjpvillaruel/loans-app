import * as yup from "yup";
import type { EmploymentStatus } from "../types/application";
export const APPLICATION_SCHEMA = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    employmentStatus: yup
      .mixed<EmploymentStatus>()
      .oneOf(["employed", "unemployed", "self-employed"] as const)
      .required(),
    companyName: yup.string().when("employmentStatus", {
      is: "employed",
      then: (schema) => schema.required("Company name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    loanPurpose: yup.string().required(),
    loanAmount: yup
      .number()
      .typeError("Loan Amount must be a number")
      .required()
      .min(2000, "Minimum loan amount is $2000"),
    depositAmount: yup
      .number()
      .typeError("Deposit must be a number")
      .required("Deposit is required")
      .min(0, "Deposit cannot be negative")
      .when("loanAmount", ([loanAmount], schema) => {
        return schema.max(loanAmount, "Deposit cannot exceed loan amount");
      }),
    loanTerm: yup
      .number()
      .required()
      .min(1, "Minimum loan term is 1 year")
      .max(7, "Maximum loan term is 7 years"),
  })
  .required();
