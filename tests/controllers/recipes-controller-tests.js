/* globals describe it */

"use strict";

const recipesController = require("../../server/controllers/recipes-controller");

const sinon = require("sinon");
const expect = require("chai").expect;
const spy = require("sinon").spy;

describe("RECIPES-CONTROLLER-TESTS", () => {
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
        let commonMock = { setIsAdminUser() { } };
        let userValidatorMock = { };
        let dataMock = {
            getAllRecipes() {
                return new Promise(resolve => resolve(allRecipes));
            }
        };

        it("data.getAllRecipes() should be called", () => {
            let controller = recipesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });
            let dataSpy = spy(dataMock, "getAllRecipes");

            controller.getAllRecipes(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.render() should be called", done => {
            let controller = recipesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });
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

    describe("addComment() tests", () => {
        let reqMock;
        let resMock;
        let foundRecipe;
        let dataMock;
        let commonMock;
        let userValidatorMock;
        let dataErrorMock;

        beforeEach(() => {
            reqMock = {
                body: {
                    entityId: "101",
                    content: "test content"
                },
                user: {
                    username: "test username"
                }
            };
            resMock = {
                redirect() {},
                status() {},
                send() {}
            };
            foundRecipe = {
                comments: [],
                save() {}
            };
            dataMock = {
                getRecipeById() {
                    return new Promise(resolve => resolve(foundRecipe));
                }
            };
            dataErrorMock = {
                getRecipeById() {
                    return new Promise((resolve, reject) => reject({}));
                }
            };
        });

        it("data.getRecipeById() should be called with body.entityId", () => {
            let controller = recipesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let dataSpy = spy(dataMock, "getRecipeById");

            controller.addComment(reqMock, resMock);
            expect(dataSpy.calledWith(reqMock.body.entityId)).to.be.true;
        });

        it("when a recipe is found, the comment should be pushed to the recipe's comments array", done => {
            let controller = recipesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(foundRecipe.comments[0].content).to.equal(reqMock.body.content);
                    expect(foundRecipe.comments[0].author).to.equal(reqMock.user.username);
                    expect(foundRecipe.comments.length).to.equal(1);
                    done();
                });
        });

        it("when a recipe is found, recipe.save() should be called after the comment is added", done => {
            let controller = recipesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let recipeSpy = sinon.spy(foundRecipe, "save");

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(recipeSpy.calledOnce).to.be.true;
                    done();
                    recipeSpy.restore();
                });
        });

        it("when a recipe is found, res.redirect() should be called after recipe.save() is called", done => {
            let controller = recipesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let resSpy = sinon.spy(resMock, "redirect");

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    done();
                    resSpy.restore();
                });
        });

        it("when an error appears, it should be caught and res.status() should be called with 500", done => {
            let controller = recipesController({ userValidator: userValidatorMock, data: dataErrorMock, common: commonMock });
            let resSpy = sinon.spy(resMock, "status");

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(500)).to.be.true;
                    done();
                    resSpy.restore();
                });
        });

        it("when an error appears, it should be caught and res.send() should be called with err object", done => {
            let controller = recipesController({ userValidator: userValidatorMock, data: dataErrorMock, common: commonMock });
            let resSpy = sinon.spy(resMock, "send");

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith({})).to.be.true;
                    done();
                    resSpy.restore();
                });
        });
    });

    describe("toggleLikeOnRecipe() tests", () => {
        let reqMock;
        let resMock;
        let foundRecipe;
        let dataMock;
        let commonMock;
        let userValidatorMock;

        beforeEach(() => {
            reqMock = {
                body: {
                    targetId: 1
                },
                user: {
                    username: "test username"
                }
            };
            resMock = {
                json() {}
            };
            foundRecipe = {
                usersLiked: [{
                    user: "test username"
                }],
                save() {}
            };
            dataMock = {
                getRecipeById() {
                    return new Promise(resolve => resolve(foundRecipe));
                },
                updateRecipe() {
                    return new Promise(resolve => resolve(foundRecipe));
                }
            };
        });

        it("data.getRecipeById() should be called with body.targetId", () => {
            let dataSpy = sinon.spy(dataMock, "getRecipeById");
            let controller = recipesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.toggleLikeOnRecipe(reqMock, resMock);
            expect(dataSpy.calledWith(reqMock.body.targetId)).to.be.true;
            dataSpy.restore();
        });

        it("when the recipe is not liked by the user, it should be liked", done => {
            let reqMoqWithDifferentUser = {
                body: {
                    targetId: 1
                },
                user: {
                    username: "test-username-second"
                }
            };
            let controller = recipesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let recipeSpy = sinon.spy(foundRecipe, "save");

            controller
                .toggleLikeOnRecipe(reqMoqWithDifferentUser, resMock)
                .then(() => {
                    expect(foundRecipe.usersLiked.length).to.equal(2);
                    expect(recipeSpy.calledOnce).to.be.true;
                    done();
                    recipeSpy.restore();
                });
        });
    });
})

