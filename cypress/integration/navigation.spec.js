let movies;
const movieId = 497582; // Enola Holmes movie id
let reviews;
const movieReview="5f69e4d0cee2f6003633becf";
const movieReview2 = "5f6f9d26a6e2d2003a7d4e02";
describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((response) => {
        console.log(response);
        reviews = response.results;
      });
  });

  describe("From the home page", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("should navigate to the movie details page and change browser URL", () => {
      cy.get(".card").eq(1).find("img").click();
      cy.url().should("include", `/movies/${movies[1].id}`);
      cy.get("h2").contains(movies[1].title);
    });
    it("should allow navigation from site header", () => {
      cy.get("nav").find("li").eq(2).find("a").click();
      cy.url().should("include", `/favorites`);
      cy.get("h2").contains("Favorite Movies");
      cy.get("nav").find("li").eq(1).find("a").click();
      cy.url().should("not.include", `/favorites`);
      cy.get("h2").contains("No. Movies");
      cy.get("nav").find("li").eq(2).find("a").click();
      cy.get("nav.navbar-brand").find("a").click();
      cy.url().should("not.include", `/favorites`);
      cy.get("h2").contains("No. Movies");
    });
  });
   /* describe("From the Movie Details page ", () => {
        beforeEach(() => {
          cy.visit(`/movies/${movieId}`);
        });
        it("should change browser URL when show/hide reviews is clicked", () => {
          cy.contains("Show Reviews").click();
          cy.url().should("include", `/movies/${movieId}/reviews`);
          cy.contains("Hide Reviews").click();
          cy.url().should("not.include", `/movies/${movieId}/reviews`);
        });
        it("navigate to the full review page when a 'Full Review' link is clicked", () => {
          cy.contains("Full Review").click();
          cy.url().should("include",`/reviews/${movieReview||movieReview2}`);
        });
      }); */
    describe("From the Favorites page", () => {
        beforeEach(() => {
          cy.visit("/");
          cy.get(".card").eq(0).find("button").click();
          cy.get("nav").find("li").eq(2).find("a").click();
        });
        it("should navigate to the movies detail page and change the browser URL", () => {
          cy.get(".card").eq(0).find("img").click();
          cy.url().should("include", `/movies/${movies[0].id}`);
          cy.get("h2").contains(movies[0].title);
        });
      });
      describe("The Go Back button", () => {
        beforeEach(() => {
          cy.visit("/");
        });
        it("should navigate from home page to movie details and back", () => {
          cy.get(".card").eq(1).find("img").click();
          cy.get("svg[data-icon=arrow-circle-left]").click();
          cy.url().should("not.include", `/movies`);
          cy.get("h2").contains("No. Movies");
        });
        it("should navigate from favorites page to movie details and back", () => {
            cy.get(".card").eq(1).find("img").click();
            cy.get("svg[data-icon=arrow-circle-left]").click();
            cy.url().should("not.include", `/movies`);
            cy.get("h2").contains("No. Movies");// TODO
        });
      });
      describe("to search page", () => {
        it("display search page ", () => {
          cy.get("#root > div > nav > nav.navbar.navbar-expand > ul > li:nth-child(4) > a").click()
          cy.wait(5000)
          cy.url().should('include','/search')
        });
      })
    });
