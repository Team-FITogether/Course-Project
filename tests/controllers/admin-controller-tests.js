/* globals describe it */
"use strict";

const adminController = require("../../server/controllers/admin-controller");

const expect = require("chai").expect;
const spy = require("sinon").spy;

describe("ADMIN-CONTROLLER-TESTS", () => {
    const ADMIN_PANEL_VIEW = "admin-area/admin-panel";

    let foods = [];
    let diets = [];
    let recipes = [];
    let usernames = [];
    let users = [];
    let category = "";
    let reqMock = {
        user: {},
        query: {
            category: ""
        },
        body: {
            username: "",
            role: "",
            category: "",
            title: "",
            content: "",
            details: "",
            calories: "",
            proteins: "",
            carbs: "",
            fats: ""
        }
    };
    let resMock = {
        render() {}
    };
    let dataMock = {
        getUsernamesOfUsers() {
            return new Promise(resolve => resolve(usernames));
        },
        getAllFoods() {
            return new Promise(resolve => resolve(foods));
        },
        getAllDiets() {
            return new Promise(resolve => resolve(foods));
        },
        getAllRecipes() {
            return new Promise(resolve => resolve(foods));
        },
        findUserAndUpdate() {
            return new Promise(resolve => resolve(users));
        },
        addNewCategory() {
            return new Promise(resolve => resolve(category));
        },
        addNewFoodCategory() {
            return new Promise(resolve => resolve(category));
        },
        addNewRecipe() {
            return new Promise(resolve => resolve(recipes));
        },
        addNewDiet() {
            return new Promise(resolve => resolve(diets));
        },
        addNewFood() {
            return new Promise(resolve => resolve(foods));
        }
    };
    let commonMock = {
        setIsAdminUser() {}
    };
    let userValidatorMock = {};

    let controller = adminController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

    describe("loadAdminPanel(req, res)", () => {
        it("Expect common.setIsAdminUser(req, userValidator) to be called", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledOnce).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });

        });

        it("Expect common.setIsAdminUser(req, userValidator) to be called with req and useValidator objects", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledWith(reqMock, userValidatorMock)).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });

        });

        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });

        });

        it("Expect data.getUsernamesOfUsers() to be called", done => {
            let getUsernamesOfUsersSpy = spy(dataMock, "getUsernamesOfUsers");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(getUsernamesOfUsersSpy.calledOnce).to.be.true;
                    getUsernamesOfUsersSpy.restore();
                    done();
                });

        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                user: reqMock.user,
                mappedUsers: usernames,
                foods
            };

            controller.loadAdminPanel(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("addRole(req, res)", () => {
        it("Expect common.setIsAdminUser(req, userValidator) to be called", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledOnce).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });

        });

        it("Expect common.setIsAdminUser(req, userValidator) to be called with req and useValidator objects", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledWith(reqMock, userValidatorMock)).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });
        });

        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });
        });

        it("Expect data.findUserAndUpdate() to be called", done => {
            let findUserAndUpdateSpy = spy(dataMock, "findUserAndUpdate");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(findUserAndUpdateSpy.calledOnce).to.be.true;
                    findUserAndUpdateSpy.restore();
                    done();
                });
        });

        it("Expect data.findUserAndUpdate() to be called with correct query and update objects ", done => {
            let findUserAndUpdateSpy = spy(dataMock, "findUserAndUpdate");
            let query = { username: reqMock.body.username };
            let update = { $push: { "roles": reqMock.body.role } };

            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(findUserAndUpdateSpy.calledWith(query, update)).to.be.true;
                    findUserAndUpdateSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                user: reqMock.user,
                foods
            };

            controller.addRole(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("addNewExerciseCategory(req, res)", () => {
        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewCategory() to be called", done => {
            let addNewCategorySpy = spy(dataMock, "addNewCategory");
            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(addNewCategorySpy.calledOnce).to.be.true;
                    addNewCategorySpy.restore();
                    done();
                });
        });

        it("Expect data.addNewCategory() to be called, with correct category", done => {
            let addNewCategorySpy = spy(dataMock, "addNewCategory");
            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(addNewCategorySpy.calledWith(category)).to.be.true;
                    addNewCategorySpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                foods
            };

            controller.addNewExerciseCategory(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("addNewFoodCategory(req, res)", () => {
        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.addNewFoodCategory(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewFoodCategory() to be called", done => {
            let addNewFoodCategorySpy = spy(dataMock, "addNewFoodCategory");
            controller.addNewFoodCategory(reqMock, resMock)
                .then(() => {
                    expect(addNewFoodCategorySpy.calledOnce).to.be.true;
                    addNewFoodCategorySpy.restore();
                    done();
                });
        });

        it("Expect data.addNewFoodCategory() to be called, with correct category", done => {
            let addNewFoodCategorySpy = spy(dataMock, "addNewFoodCategory");
            controller.addNewFoodCategory(reqMock, resMock)
                .then(() => {
                    expect(addNewFoodCategorySpy.calledWith(category)).to.be.true;
                    addNewFoodCategorySpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.addNewFoodCategory(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                foods
            };

            controller.addNewFoodCategory(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("addNewRecipe(req, res)", () => {
        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.addNewRecipe(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewRecipe() to be called", done => {
            let addNewRecipeSpy = spy(dataMock, "addNewRecipe");
            controller.addNewRecipe(reqMock, resMock)
                .then(() => {
                    expect(addNewRecipeSpy.calledOnce).to.be.true;
                    addNewRecipeSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewRecipe() to be called, with correct category", done => {
            let addNewRecipeSpy = spy(dataMock, "addNewRecipe");
            controller.addNewRecipe(reqMock, resMock)
                .then(() => {
                    expect(addNewRecipeSpy.calledWith(reqMock.body.title, reqMock.body.content)).to.be.true;
                    addNewRecipeSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.addNewRecipe(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                foods
            };

            controller.addNewRecipe(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("addNewDiet(req, res)", () => {
        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.addNewDiet(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewDiet() to be called", done => {
            let addNewDietSpy = spy(dataMock, "addNewDiet");
            controller.addNewDiet(reqMock, resMock)
                .then(() => {
                    expect(addNewDietSpy.calledOnce).to.be.true;
                    addNewDietSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewDiet() to be called, with correct title and content", done => {
            let addNewDietSpy = spy(dataMock, "addNewDiet");
            let title = reqMock.body.title;
            let content = reqMock.body.content;

            controller.addNewDiet(reqMock, resMock)
                .then(() => {
                    expect(addNewDietSpy.calledWith(title, content)).to.be.true;
                    addNewDietSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.addNewDiet(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                foods
            };

            controller.addNewDiet(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("addNewFood(req, res)", () => {
        it("Expect data.getAllFoods() to be called", done => {
            let getAllFoodsSpy = spy(dataMock, "getAllFoods");
            controller.addNewFood(reqMock, resMock)
                .then(() => {
                    expect(getAllFoodsSpy.calledOnce).to.be.true;
                    getAllFoodsSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewFood() to be called", done => {
            let addNewFoodSpy = spy(dataMock, "addNewFood");
            controller.addNewFood(reqMock, resMock)
                .then(() => {
                    expect(addNewFoodSpy.calledOnce).to.be.true;
                    addNewFoodSpy.restore();
                    done();
                });
        });

        it("Expect data.addNewFood() to be called, with correct title and content", done => {
            let addNewFoodSpy = spy(dataMock, "addNewFood");
            let title = reqMock.body.title;
            let details = reqMock.body.details;
            let calories = reqMock.body.calories;
            let proteins = reqMock.body.proteins;
            let carbs = reqMock.body.carbs;
            let fats = reqMock.body.fats;
            let categor = reqMock.body.category;

            controller.addNewFood(reqMock, resMock)
                .then(() => {
                    expect(addNewFoodSpy.calledWith(title, details, calories, proteins, carbs, fats, categor)).to.be.true;
                    addNewFoodSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.addNewFood(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with ADMIN_PANEL_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = {
                foods
            };

            controller.addNewFood(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(ADMIN_PANEL_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });
});