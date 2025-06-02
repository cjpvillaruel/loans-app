describe("Loan Details", () => {
  beforeEach(() => {
    // Visit the loan application page before each test
    cy.visit("http://localhost:5173");
  });

  describe("Loan Details Validation", () => {
    beforeEach(() => {
      cy.get('[name="firstName"]').type("John");
      cy.get('[name="lastName"]').type("Doe");
      cy.get('[name="emailAddress"]').type("test@gmail.com");
      cy.get('[data-testid="employment-status-select"]').click();
      cy.get('[data-testid="employment-status-self-employed"]').click();
      cy.get('[data-testid="next-button"]').should("be.enabled");
      cy.get('[data-testid="next-button"]').click();
    });

    describe("Loan Amount", () => {
      it("should validate loan amount", () => {
        cy.get('[name="loanAmount"]').type("10000");
        cy.get('[name="loanAmount"]').clear();
        cy.contains("Minimum loan amount is $2000").should("exist");
      });
    });

    describe("Deposit", () => {
      it("should display deposit amount when loan purpose is vehicle", () => {
        cy.get('[data-testid="loan-purpose-select"]').click();
        cy.get('[data-testid="loan-purpose-vehicle"]').click();
        cy.get('[name="depositAmount"]').should("exist");
      });

      it("should not display deposit amount when loan purpose is vehicle", () => {
        cy.get('[data-testid="loan-purpose-select"]').click();
        cy.get('[data-testid="loan-purpose-others"]').click();
        cy.get('[name="depositAmount"]').should("not.exist");
      });

      it("should not be greater than loan amount", () => {
        cy.get('[data-testid="loan-purpose-select"]').click();
        cy.get('[data-testid="loan-purpose-vehicle"]').click();
        cy.get('[name="loanAmount"]').type("20000");
        cy.get('[name="depositAmount"]').type("50000");
        cy.contains("Deposit cannot exceed loan amount").should("exist");
      });
    });

    it("should validate fields when next button is clicked", () => {
      cy.get('[data-testid="next-button"]').click();
      cy.contains("Loan Amount must be a number").should("exist");
    });

    it("should submit the form when all fields are valid", () => {
      cy.intercept("api/loan-applications/offers", {
        fixture: "offers",
      }).as("getOffers");

      cy.get('[name="loanAmount"]').type("20000");
      cy.get('[data-testid="loan-purpose-select"]').click();
      cy.get('[data-testid="loan-purpose-vehicle"]').click();

      cy.get('[data-testid="next-button"]').click();

      cy.wait("@getOffers");
      cy.contains("Lender A").should("exist");
      cy.contains("Lender B").should("exist");
      cy.contains("Lender C").should("exist");
    });
  });
});
