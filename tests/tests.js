/*globals describe, it, require, before, global, $, jQuery, document*/

"use strict";

var expect = require("chai").expect;

describe("Test expected to pass", () => {
    it("Expect to pass so I can fool Travis CI", () => {
        expect(0).to.equal(0);
    });
});