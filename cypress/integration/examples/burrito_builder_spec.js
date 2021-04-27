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
})