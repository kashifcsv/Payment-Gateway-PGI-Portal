import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
import Footer from "./components/layout/Footer.js";
import { act } from "react-dom/test-utils";

import { render, unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

/**
 * Unit test to check/verify Footer component text and links
 * @type {string}
 */
let expectedAboutText = "About";
let expectedAboutLink = "https://some.com.com/mobile-apps/some";
let expectedTermsOfUseText = "Terms of use";
let expectedTermsOfUseLink = "https://some.com.com/mobile-apps/some";
let expectedPrivacyPolicyText = "Privacy policy";
let expectedPrivacyPolicyLink = "https://www.some.com.com/help/customer-privacy-policy/";

it("renders footer", () => {
  act(() => {
    render(<Footer />, container);
  });
  expect(container.querySelector("[data-testid='aboutLink']").textContent).toBe(expectedAboutText);
  expect(container.querySelector("[data-testid='aboutLink']").getAttribute("href")).toBe(
    expectedAboutLink
  );
  expect(container.querySelector("[data-testid='termsOfUseLink']").textContent).toBe(
    expectedTermsOfUseText
  );
  expect(container.querySelector("[data-testid='termsOfUseLink']").getAttribute("href")).toBe(
    expectedTermsOfUseLink
  );
  expect(container.querySelector("[data-testid='privacyPolicyLink']").textContent).toBe(
    expectedPrivacyPolicyText
  );
  expect(container.querySelector("[data-testid='privacyPolicyLink']").getAttribute("href")).toBe(
    expectedPrivacyPolicyLink
  );
});
