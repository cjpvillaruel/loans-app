import * as yup from 'yup';
import { EmploymentStatus } from '../models/userModel';

export const loanApplicationSchema = yup
  .object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    emailAddress: yup
      .string()
      .required('Email Address is required')
      .email('Invalid Email Address'),
    employmentStatus: yup
      .mixed<EmploymentStatus>()
      .oneOf(['employed', 'unemployed', 'self-employed'] as const)
      .required('Employment Status is required'),

    companyName: yup.string().when('employmentStatus', {
      is: 'employed',
      then: (schema) => schema.required('Company name is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    loanPurpose: yup.string().required('Loan Purpose is required'),
    loanAmount: yup
      .number()
      .typeError('Loan Amount must be a number')
      .required('Loan Amount is required')
      .min(2000, 'Minimum loan amount is $2000'),
    depositAmount: yup
      .number()
      .typeError('Deposit must be a number')
      .required('Deposit is required')
      .min(0, 'Deposit cannot be negative')
      .when('loanAmount', ([loanAmount], schema) => {
        return loanAmount
          ? schema.max(loanAmount, 'Deposit cannot exceed loan amount')
          : schema;
      }),
    loanTerm: yup
      .number()
      .required()
      .min(1, 'Minimum loan term is 1 year')
      .max(7, 'Maximum loan term is 7 years'),
  })
  .required();
