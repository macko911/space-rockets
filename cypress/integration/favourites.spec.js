let addedFavourites = [];

function addToFavourites(index, nameLabel, itemLabel) {
  // keep launch mission name for later comparison
  cy.findAllByLabelText(nameLabel)
    .eq(index)
    .then(($el) => {
        addedFavourites.push($el.text());
    });

  // click on favourite button
  cy.findAllByLabelText("Favourite button")
    .eq(index)
    .click();

  // check that favourite button stays pressed for this item
  cy.findAllByLabelText(itemLabel)
    .eq(index)
    .within(() => {
      cy.get("[aria-pressed=true]").should("exist");
    });
}

describe("Favourite launches", () => {
  beforeEach(() => {
    // reset favourites list
    addedFavourites = [];
  });

  it("Add/remove favourite launches", () => {
    cy.visit("/launches");

    addToFavourites(0, "Launch mission name", "Launch item");
    addToFavourites(2, "Launch mission name", "Launch item");
    addToFavourites(5, "Launch mission name", "Launch item");

    cy.intercept(/https:\/\/api.spacexdata.com\/v3\/launches\/[0-9]*\?/).as("getLaunchDetail");

    // open favourites list in drawer
    cy.findByText("Favourites").click();

    // wait for details of favourite items to load
    cy.wait(["@getLaunchDetail", "@getLaunchDetail", "@getLaunchDetail"]);
    // test is too fast and checks for favourite items before they are visible
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);

    cy.findByLabelText("Favourites list").within(() => {
      // check that names of favourite items in list match those that we clicked on
      cy.findAllByLabelText("Launch mission name").then((elements) => {
        expect(elements.length).to.equal(3);
        elements.each(function (index, element) {
          expect(element.innerText).to.equal(addedFavourites[index]);
        });
      });
    });

    // check that data is persisted after browser reload
    cy.reload();

    // open favourites list in drawer
    cy.findByText("Favourites").click();

    // wait for details of favourite items to load
    cy.wait(["@getLaunchDetail", "@getLaunchDetail", "@getLaunchDetail"]);
    // test is too fast and checks for favourite items before they are visible
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);

    cy.findByLabelText("Favourites list").within(() => {
      // check that names of favourite items in list match those that we clicked on
      cy.findAllByLabelText("Launch mission name").then((elements) => {
        expect(elements.length).to.equal(3);
        elements.each(function (index, element) {
          expect(element.innerText).to.equal(addedFavourites[index]);
        });
      });

      // try to remove one item from the list
      cy.findAllByLabelText("Favourite button").eq(0).click();
      cy.findAllByLabelText("Launch item").should("have.length", 2);
    });

    // close drawer
    cy.findByLabelText("Close").click();
    // have to wait for a closing animation
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);

    cy.findByLabelText("Favourites list").should("not.exist");
  });

  it("Add/remove favourite launch pads", () => {
    cy.visit("/launch-pads");

    addToFavourites(0, "Launch pad name", "Launch pad item");
    addToFavourites(2, "Launch pad name", "Launch pad item");
    addToFavourites(5, "Launch pad name", "Launch pad item");

    cy.intercept(/https:\/\/api.spacexdata.com\/v3\/launchpads\/.*/).as("getLaunchPadDetails");

    // open favourites list in drawer
    cy.findByText("Favourites").click();

    // wait for details of favourite items to load
    cy.wait(["@getLaunchPadDetails", "@getLaunchPadDetails", "@getLaunchPadDetails"]);
    // test is too fast and checks for favourite items before they are visible
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);

    cy.findByLabelText("Favourites list").within(() => {
      // check that names of favourite items in list match those that we clicked on
      cy.findAllByLabelText("Launch pad name").then((elements) => {
        expect(elements.length).to.equal(3);
        elements.each(function (index, element) {
          expect(element.innerText).to.equal(addedFavourites[index]);
        });
      });
    });

    // check that data is persisted after browser reload
    cy.reload();

    // open favourites list in drawer
    cy.findByText("Favourites").click();

    // wait for details of favourite items to load
    cy.wait(["@getLaunchPadDetails", "@getLaunchPadDetails", "@getLaunchPadDetails"]);
    // test is too fast and checks for favourite items before they are visible
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);

    cy.findByLabelText("Favourites list").within(() => {
      // check that names of favourite items in list match those that we clicked on
      cy.findAllByLabelText("Launch pad name").then((elements) => {
        expect(elements.length).to.equal(3);
        elements.each(function (index, element) {
          expect(element.innerText).to.equal(addedFavourites[index]);
        });
      });

      // try to remove one item from the list
      cy.findAllByLabelText("Favourite button").eq(0).click();
      cy.findAllByLabelText("Launch pad item").should("have.length", 2);
    });

    // close drawer
    cy.findByLabelText("Close").click();
    // have to wait for a closing animation
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);

    cy.findByLabelText("Favourites list").should("not.exist");
  });
});
