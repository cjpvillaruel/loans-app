import { Button, Step, StepLabel, Stepper } from "@mui/material";
import UserForm from "../organisms/UserForm";
import { useCallback, useState } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoanDetailsForm from "../organisms/LoanDetailsForm";
import type {
  ApplicationForm,
  EmploymentStatus,
} from "../../types/application";
import LoanOptionsForm from "../organisms/LoanOptionsForm";

const PERSONAL_INFORMATION_STEP = 0;
const LOAN_DETAILS_STEP = 1;
const SELECT_LENDER_STEP = 2;

const schema = yup
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
    deposit: yup
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

const STEPS = [
  {
    step: PERSONAL_INFORMATION_STEP,
    label: "Personal Information",
    description: "Enter your personal information",
    fields: ["firstName", "lastName", "employmentStatus", "companyName"],
    Component: UserForm,
  },
  {
    step: LOAN_DETAILS_STEP,
    label: "Loan Details",
    fields: ["loanPurpose", "loanAmount", "deposit", "loanTerm"],
    description: "Provide details about the loan you want",
    Component: LoanDetailsForm,
  },
  {
    step: SELECT_LENDER_STEP,
    label: "Select Lender",
    description: "Choose a lender for your loan",
    Component: LoanOptionsForm,
  },
];
const ApplicationPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<ApplicationForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      employmentStatus: "employed",
      deposit: 0,
      loanPurpose: "vehicle",
      loanTerm: 1,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema) as Resolver<ApplicationForm>,
  });
  const { trigger, getValues } = methods;

  const handleNext = useCallback(() => {
    trigger(STEPS[activeStep].fields as (keyof ApplicationForm)[]).then(
      (isValid) => {
        if (!isValid) {
          console.error("Form is invalid for step:", activeStep);
          return;
        } else {
          if (activeStep < STEPS.length - 1) {
            setActiveStep((prev) => prev + 1);
          }
        }
      }
    );
  }, [activeStep, trigger, getValues]);

  const handlePrevious = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  }, [activeStep]);

  const isFormValid = useCallback(
    (step: number) => {
      if (!STEPS[step]?.fields) return false;
      return STEPS[step].fields.every((field) => {
        const error = methods.formState.errors[field as keyof ApplicationForm];
        return !error;
      });
    },
    [methods.formState.errors]
  );

  return (
    <div className="application-page">
      <Stepper activeStep={activeStep}>
        {STEPS.map((stepDetails) => (
          <Step key={stepDetails.step}>
            <StepLabel>{stepDetails.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormProvider {...methods}>
        {STEPS.map((stepDetails, index) => {
          const Component = stepDetails.Component;
          return (
            <div
              key={stepDetails.step}
              style={{
                display: activeStep === index ? "block" : "none",
                marginTop: "16px",
              }}
            >
              <Component />
            </div>
          );
        })}
      </FormProvider>
      {activeStep > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevious}
          disabled={!isFormValid(activeStep - 1)}
        >
          Previous
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!isFormValid(activeStep)}
      >
        {activeStep < STEPS.length - 1 ? "Next" : "Submit"}
      </Button>
    </div>
  );
};
export default ApplicationPage;
