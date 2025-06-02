import LoanDetailsForm from "../components/organisms/LoanDetailsForm";
import LoanOptionsForm from "../components/organisms/LoanOptionsForm";
import UserForm from "../components/organisms/UserForm";

export const PERSONAL_INFORMATION_STEP = 0;
export const LOAN_DETAILS_STEP = 1;
export const VIEW_OFFERS = 2;

export const STEPS = [
  {
    step: PERSONAL_INFORMATION_STEP,
    label: "Personal Information",
    fields: ["firstName", "lastName", "employmentStatus", "companyName"],
    Component: UserForm,
  },
  {
    step: LOAN_DETAILS_STEP,
    label: "Loan Details",
    fields: ["loanPurpose", "loanAmount", "deposit", "loanTerm"],

    Component: LoanDetailsForm,
  },
  {
    step: VIEW_OFFERS,
    label: "View Offers",
    Component: LoanOptionsForm,
  },
];
