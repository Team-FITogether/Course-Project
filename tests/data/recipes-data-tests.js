/* globals describe it beforeEach afterEach */
"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("RECIPES-DATA-TESTS", () => {
    class Recipe {
        constructor(properties) {
            this.title = properties.title;
            this.body = properties.body;
            this.imgSrc = properties.imgSrc;
            this.likes = properties.likes;
            this.usersLiked = properties.usersLiked;
            this.comments = properties.comments;
        }
        save() { }
        count() { }
        static find() { return this; }
        static findOne() { return this; }
        static findOneAndUpdate() { return this; }

        static select() { return this; }
        static exec() { return this; }
        static sort() { return this; }
        static limit() { return this; }
        static where() { return this; }
        static equals() { return this; }
        static skip() { return this; }
    }

    const data = require("./../../server/data/recipes-data")({ Recipe });

    const recipes = require("./../samples/sample-recipes");

    describe("getRecipeById(id)", () => {
        beforeEach(() => {
            sinon.stub(Recipe, "findOne", (query, callback) => {
                let id = query._id;
                let foundRecipe = recipes.find(a => a._id === id);
                callback(null, foundRecipe);
            });
        });

        afterEach(() => {
            Recipe.findOne.restore();
        });

        it("Expect getRecipeById() to return a signle recipe, if correct id is passed", done => {
            data.getRecipeById(1)
                .then(foundRecipe => {
                    expect(foundRecipe).to.eql(recipes[0]);
                    done();
                });
        });

        it("Expect getRecipeById() to return null, if incorrect id is passed", done => {
            data.getRecipeById(42)
                .then(foundRecipe => {
                    expect(foundRecipe).to.be.null;
                    done();
                });
        });
    });

    describe("getSingleRecipe(title)", () => {
        beforeEach(() => {
            sinon.stub(Recipe, "findOne", (query, callback) => {
                let title = query.title;
                let foundRecipe = recipes.find(a => a.title === title);
                callback(null, foundRecipe);
            });
        });

        afterEach(() => {
            Recipe.findOne.restore();
        });

        it("Expect getSingleRecipe() to return a signle recipe, if correct title is passed", done => {
            data.getSingleRecipe("Крем супа от тиква")
                .then(foundRecipe => {
                    expect(foundRecipe).to.eql(recipes[2]);
                    done();
                });
        });

        it("Expect getSingleRecipe() to return null, if incorrect title is passed", done => {
            data.getSingleRecipe("incorrect")
                .then(foundRecipe => {
                    expect(foundRecipe).to.be.null;
                    done();
                });
        });
    });

    describe("updateRecipe(id, update, options)", () => {
        beforeEach(() => {
            sinon.stub(Recipe, "findOneAndUpdate", (query, update, options, callback) => {
                let id = query._id;
                let foundRecipe = recipes.find(a => a._id === id);
                if (foundRecipe) {
                    foundRecipe.likes += update;
                }
                callback(null, foundRecipe);
            });
        });

        afterEach(() => {
            Recipe.findOneAndUpdate.restore();
        });

        it("Expect updateRecipe(id, update, options) to update recipe, when correct id and parameters are passed", done => {
            let update = 1;
            let options = null;

            data.updateRecipe(2, update, options)
                .then(updateRecipe => {
                    expect(updateRecipe.likes).to.equal(1);
                    done();
                });
        });

        it("Expect updateRecipe(id, update, options) to return null when not existing id is passed", done => {
            let update = 1;
            let options = null;

            data.updateRecipe(42, update, options)
                .then(updateRecipe => {
                    expect(updateRecipe).to.be.null;
                    done();
                });
        });
    });

    describe("addNewRecipe(title, content)", () => {
        beforeEach(() => {
            sinon.stub(Recipe.prototype, "save", callback => {
                callback(null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect addNewRecipe(title, content) to save recipe with correct title", done => {
            let newTitle = "New Recipe";
            let newBody = "New Content";
            data.addNewRecipe(newTitle, newBody)
                .then(newRecipe => {
                    expect(newRecipe.title).to.equal(newTitle);
                    done();
                });
        });
    });
});