import { Button, Step, StepLabel, Stepper } from "@mui/material";
import UserForm from "../organisms/UserForm";
import { useCallback, useState } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import LoanDetailsForm from "../organisms/LoanDetailsForm";
import type { ApplicationForm } from "../../types/application";
import LoanOptionsForm from "../organisms/LoanOptionsForm";
import { APPLICATION_SCHEMA } from "../../constants/applicationSchema";
import { useMutation } from "@tanstack/react-query";
import type { LoanOffer } from "../../types/loanOffer";

const PERSONAL_INFORMATION_STEP = 0;
const LOAN_DETAILS_STEP = 1;
const SELECT_LENDER_STEP = 2;

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

  const { data, status, error, mutate } = useMutation({
    mutationKey: ["offers"],
    mutationFn: async (data: ApplicationForm) => {
      const url = `http://localhost:3000/api/loanApplications/offers`; // Adjust the URL as needed
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const loanOffers: LoanOffer[] = await response.json();
      return loanOffers;
    },
  });

  const methods = useForm<ApplicationForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      employmentStatus: "employed",
      depositAmount: 0,
      loanPurpose: "vehicle",
      loanTerm: 1,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(APPLICATION_SCHEMA) as Resolver<ApplicationForm>,
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
            if (activeStep === LOAN_DETAILS_STEP) {
              const formData = getValues();
              mutate(formData); // Fetch offers when reaching the last step
            }
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
        {[PERSONAL_INFORMATION_STEP, LOAN_DETAILS_STEP].map((step) => {
          const stepDetails = STEPS[step];
          if (!stepDetails) return null;
          const Component = stepDetails.Component;
          return (
            <div
              key={stepDetails.step}
              style={{
                display: activeStep === step ? "block" : "none",
                marginTop: "16px",
              }}
            >
              <Component />
            </div>
          );
        })}
        {activeStep === SELECT_LENDER_STEP && (
          <LoanOptionsForm
            loading={status === "pending"}
            loanOffers={data ?? []}
            error={error}
          />
        )}
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
