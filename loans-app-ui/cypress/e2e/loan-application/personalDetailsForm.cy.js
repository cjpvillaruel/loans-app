describe("Loan Application", () => {
  beforeEach(() => {
    // Visit the loan application page before each test
    cy.visit("http://localhost:5173");
  });

  it("should display the loan application form", () => {
    // Check if the form is visible
    const formFields = [
      "firstName",
      "lastName",
      "emailAddress",
      "employmentStatus",
      "companyName",
    ];
    // Check if all form fields are present
    formFields.forEach((field) => {
      cy.get(`[name="${field}"]`).should("exist");
    });
  });

  describe("User Details Validation", () => {
    it("should validate first name", () => {
      cy.get('[name="firstName"]').type("John");
      cy.get('[name="firstName"]').clear("");
      cy.contains("First Name is required").should("exist");
    });
    it("should validate last name", () => {
      cy.get('[name="lastName"]').type("Doe");
      cy.get('[name="lastName"]').clear("");
      cy.contains("Last Name is required").should("exist");
    });

    it("should validate email address", () => {
      cy.get('[name="emailAddress"]').type("John");
      cy.get('[name="emailAddress"]').clear("");
      cy.contains("Email Address is required").should("exist");
      cy.get('[name="emailAddress"]').type("invalid-email");
      cy.contains("Invalid Email Address").should("exist");
    });

    describe("Employment Status", () => {
      it("should show company name when employment status is 'Employed'", () => {
        cy.get('[data-testid="employment-status-select"]').click();
        cy.get('[data-testid="employment-status-employed"]').click();
        cy.get('[name="companyName"]').should("exist");
        cy.get('[name="companyName"]').type("Tech Corp");
        cy.get('[name="companyName"]').clear("");
        cy.contains("Company Name is required").should("exist");
      });
      it("should not show company name when employment status is 'Unemployed'", () => {
        cy.get('[data-testid="employment-status-select"]').click();
        cy.get('[data-testid="employment-status-unemployed"]').click();
        cy.get('[name="companyName"]').should("not.exist");
      });
      it("should not show company name when employment status is 'Self Employed'", () => {
        cy.get('[data-testid="employment-status-select"]').click();
        cy.get('[data-testid="employment-status-self-employed"]').click();
        cy.get('[name="companyName"]').should("not.exist");
      });
    });
    it("should trigger form validation when next button is clicked", () => {
      cy.get('[name="firstName"]').type("John");
      cy.get('[name="lastName"]').type("Doe");
      cy.get('[name="emailAddress"]').type("InvalidAddress");
      const nextButton = cy.get('[data-testid="next-button"]').click();
      cy.contains("Invalid Email Address").should("exist");
      // button should  be disabled
      cy.get('[data-testid="next-button"]').should("be.disabled");
    });
    it("should go to the next step when user form is valid", () => {
      cy.get('[name="firstName"]').type("John");
      cy.get('[name="lastName"]').type("Doe");
      cy.get('[name="emailAddress"]').type("test@gmail.com");
      cy.get('[data-testid="employment-status-select"]').click();
      cy.get('[data-testid="employment-status-self-employed"]').click();
      cy.get('[data-testid="next-button"]').should("be.enabled");
      cy.get('[data-testid="next-button"]').click();
      cy.contains("Personal Information").should("have.class", "Mui-completed");
      cy.contains("Loan Details").should("have.class", "Mui-active");
    });
  });
});
