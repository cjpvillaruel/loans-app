import { Button, Step, StepLabel, Stepper } from "@mui/material";

import { useCallback, useState } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import type { ApplicationForm } from "../../types/application";
import { APPLICATION_SCHEMA } from "../../constants/applicationSchema";
import { useMutation } from "@tanstack/react-query";
import type { LoanOffer } from "../../types/loanOffer";
import {
  LOAN_DETAILS_STEP,
  PERSONAL_INFORMATION_STEP,
  STEPS,
} from "../../constants/applicationSteps";

const ApplicationPage = () => {
  const [activeStep, setActiveStep] = useState(PERSONAL_INFORMATION_STEP);

  const { data, status, error, mutate } = useMutation({
    mutationKey: ["offers"],
    mutationFn: async (data: ApplicationForm) => {
      const url = `${import.meta.env.VITE_API_URL}/loan-applications/offers`; // Adjust the URL as needed
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch loan offers");
      }

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
        if (isValid) {
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
  }, [activeStep, trigger, getValues, mutate]);

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
            <StepLabel data-testid={stepDetails.label}>
              {stepDetails.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <FormProvider {...methods}>
        {STEPS.map((stepDetails) => {
          const Component = stepDetails.Component;
          return (
            <div
              key={stepDetails.step}
              style={{
                display: activeStep === stepDetails.step ? "block" : "none",
                marginTop: "16px",
              }}
            >
              <Component
                loading={status === "pending"}
                loanOffers={data ?? []}
                error={error}
              />
            </div>
          );
        })}
      </FormProvider>
      <div style={{ marginTop: "16px" }}>
        {activeStep > 0 && (
          <Button
            style={{ marginRight: "8px" }}
            variant="contained"
            data-testid="previous-button"
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
          data-testid="next-button"
          onClick={handleNext}
          disabled={!isFormValid(activeStep) || status === "pending"}
        >
          {activeStep === PERSONAL_INFORMATION_STEP ? "Next" : "Submit"}
        </Button>
      </div>
    </div>
  );
};
export default ApplicationPage;
