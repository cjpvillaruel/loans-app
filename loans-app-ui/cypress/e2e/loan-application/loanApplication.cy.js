describe("Loan Application", () => {
  beforeEach(() => {
    // Visit the loan application page before each test
    cy.visit("http://localhost:5173");
  });

  describe("Loan Details Application Flow", () => {
    beforeEach(() => {
      cy.get('[name="firstName"]').type("John");
      cy.get('[name="lastName"]').type("Doe");
      cy.get('[name="emailAddress"]').type("test@gmail.com");
      cy.get('[data-testid="employment-status-select"]').click();
      cy.get('[data-testid="employment-status-self-employed"]').click();
      cy.get('[data-testid="next-button"]').should("be.enabled");
      cy.get('[data-testid="next-button"]').click();
      cy.get('[name="loanAmount"]').type("20000");
      cy.get('[data-testid="loan-purpose-select"]').click();
      cy.get('[data-testid="loan-purpose-vehicle"]').click();
    });

    it("should call the API and display offers when all fields are valid", () => {
      cy.intercept("POST", "/api/loanApplications/offers", {
        fixture: "offers",
      }).as("getOffers");

      cy.get('[data-testid="next-button"]').click();
      cy.contains("Lender A").should("exist");
      cy.contains("Lender B").should("exist");
      cy.contains("Lender C").should("exist");
    });

    it("should display an error message when API call fails", () => {
      cy.intercept("POST", "/api/loanApplications/offers", {
        statusCode: 500,
        body: { error: "Internal Server Error", data: null },
      }).as("getOffersError");

      cy.get('[data-testid="next-button"]').click();
      cy.contains("Error loading loan options. Please try again.").should(
        "exist"
      );
    });

    it("should display a message when there are no options available", () => {
      cy.intercept("POST", "/api/loanApplications/offers", {
        statusCode: 200,
        body: [],
      }).as("getOffersError");

      cy.get('[data-testid="next-button"]').click();
      cy.contains("No loan options available").should("exist");
    });
  });
});
