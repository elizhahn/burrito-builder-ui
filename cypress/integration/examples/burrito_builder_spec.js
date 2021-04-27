describe("Burrito Builder", () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: "allOrders.json"})
    cy.visit("http://localhost:3000/");
  });
  it("should show a burrito order portal", () => {
    cy.get("[data-cy=App-title]").contains("Burrito Builder");
    cy.get("[data-cy=order-name-input]").should("exist");
    cy.fixture('/ingredients.json').then((ingredients) => {
      ingredients.ingredients.forEach(ingredient => {
        cy.get("[data-cy=ingredient-btn]").contains(ingredient)
      });
    });
    cy.get("[data-cy=order-display]").contains("Order: Nothing selected")
    cy.get("[data-cy=submit-order-btn]").contains("Submit Order");
    cy.get("[data-cy=order-card]").should("have.length", 2);
    cy.get("[data-cy=order-card]").eq(0).should("contain", "Elizabeth")
      .and("contain", "beans")
      .and("contain", "lettuce")
      .and("contain", "queso fresco")
      .and("contain", "pico de gallo");
    cy.get("[data-cy=order-card]").eq(1).should("contain", "Moon Star")
    .and("contain", "beans")
    .and("contain", "lettuce")
    .and("contain", "hot sauce")
    .and("contain", "pico de gallo")
    .and("contain", "sour cream");
  });

  it("should submit an order", () => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: "newOrder.json"});
    cy.get("[data-cy=order-name-input]").type("rainbow")
    .get("[data-cy=ingredient-btn]").contains("beans").click()
    .get("[data-cy=ingredient-btn]").contains("lettuce").click()
    .get("[data-cy=ingredient-btn]").contains("guacamole").click()
    .get("[data-cy=ingredient-btn]").contains("cilantro").click()
    .get("[data-cy=ingredient-btn]").contains("hot sauce").click()
    .get("[data-cy=order-display]").contains("Order: beans, lettuce, guacamole, cilantro, hot sauce")
    .get("[data-cy=submit-order-btn]").click();
    cy.get("[data-cy=order-card]").should("have.length", 3); 
    cy.get("[data-cy=order-card]").eq(2).should("contain", "rainbow")
    .and("contain", "beans")
    .and("contain", "lettuce")
    .and("contain", "guacamole")
    .and("contain", "cilantro")
    .and("contain", "hot sauce");
  });

  it("should show error messages if form not filled out correctly", () => {
    cy.get("[data-cy=submit-order-btn]").click();
    cy.get("[data-cy=form-error-msg]").contains("We need a name for the order");
    cy.get("[data-cy=order-card]").should("have.length", 2);
    cy.get("[data-cy=order-name-input]").type("Sunny");
    cy.get("[data-cy=submit-order-btn]").click();
    cy.get("[data-cy=form-error-msg]").contains("Please select at least one ingredient");
    cy.get("[data-cy=order-card]").should("have.length", 2);
  });
});