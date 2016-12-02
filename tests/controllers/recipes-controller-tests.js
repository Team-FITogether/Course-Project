/* globals describe it */

"use strict";

const recipesController = require("../../server/controllers/recipes-controller");

const expect = require("chai").expect;
const spy = require("sinon").spy;

describe("getAllRecipes() tests", () => {
    let recipes = [];
    let allRecipes = [recipes];
    let reqMock = {
        user: {},
        query: {
            page: 2
        }
    };
    let resMock = {
        render() {}
    };
    let dataMock = {
        getAllRecipes() {
            return new Promise(resolve => resolve(allRecipes));
        }
    };

    it("data.getAllRecipes() should be called", () => {
        let controller = recipesController({ data: dataMock });
        let dataSpy = spy(dataMock, "getAllRecipes");

        controller.getAllRecipes(reqMock, resMock);
        expect(dataSpy.calledOnce).to.be.true;
        dataSpy.restore();
    });

    it("res.render() should be called", done => {
        let controller = recipesController({ data: dataMock });
        let resSpy = spy(resMock, "render");

        controller
            .getAllRecipes(reqMock, resMock)
            .then(() => {
                expect(resSpy.calledOnce).to.be.true;
                resSpy.restore();
                done();
            });
    });
});

describe("getSingleRecipe() tests", () => {
    let recipe = {
        _id: "",
        title: "",
        body: "",
        imgUrl: "",
        comments: [],
        user: {}
    };
    let reqMock = {
        query: [recipe]
    };
    let resMock = {
        render() {}
    };
    let dataMock = {
        getSingleRecipe() {
            return new Promise(resolve => resolve([recipe]));
        }
    }

    it("data.getSingleRecipe() should be called", () => {
        let controller = recipesController({ data: dataMock });
        let dataSpy = spy(dataMock, "getSingleRecipe");

        controller.getSingleRecipe(reqMock, resMock);
        expect(dataSpy.calledOnce).to.be.true;
        dataSpy.restore();
    });

    it("res.render() should be called", done => {
        let controller = recipesController({ data: dataMock });
        let resSpy = spy(resMock, "render");

        controller
            .getSingleRecipe(reqMock, resMock)
            .then(() => {
                expect(resSpy.calledOnce).to.be.true;
                done();
                resSpy.restore();
            });
    });
});
