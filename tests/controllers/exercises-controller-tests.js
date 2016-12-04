/* globals describe it */

"use strict";

const exercisesController = require("../../server/controllers/exercises-controller");

const sinon = require("sinon");
const expect = require("chai").expect;
const spy = require("sinon").spy;

describe("EXERCISES-CONTROLLER-TESTS", () => {
    describe("getAllExercisesByCategory() tests", () => {
        let exercises = [];
        let reqMock = {
            user: {},
            query: {
                category: ""
            }
        };
        let resMock = {
            render() {}
        };
        let dataMock = {
            getAllExercisesByCategory() {
                return new Promise(resolve => resolve(exercises));
            }
        };
        let commonMock = {
            setIsAdminUser() {}
        };
        let userValidatorMock = {};

        it("data.getAllExercisesByCategory() should be called", () => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let dataSpy = spy(dataMock, "getAllExercisesByCategory");

            controller.getAllExercisesByCategory(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.render() should be called", done => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let resSpy = spy(resMock, "render");

            controller
                .getAllExercisesByCategory(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("getSingleExercise() tests", () => {
        let explanation = {
            comments: []
        };
        let reqMock = {
            query: {
                title: ""
            }
        };
        let resMock = {
            render() {}
        };
        let dataMock = {
            getSingleExercise() {
                return new Promise(resolve => resolve(explanation));
            }
        };
        let commonMock = {
            setIsAdminUser() {}
        };
        let userValidatorMock = {};

        it("common.setIsAdminUser() should be called", () => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let commonSpy = spy(commonMock, "setIsAdminUser");

            controller.getSingleExercise(reqMock, resMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });

        it("res.render() should be called", done => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let resSpy = spy(resMock, "render");

            controller
                .getSingleExercise(reqMock, resMock)
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
        let foundExercise;
        let dataMock;
        let commonMock;
        let userValidatorMock;
        let dataErrorMock;

        beforeEach(() => {
            reqMock = {
                body: {
                    entityId: "001",
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
            foundExercise = {
                comments: [],
                save() {}
            };
            dataMock = {
                getExerciseExplanationById() {
                    return new Promise(resolve => resolve(foundExercise));
                }
            };
            dataErrorMock = {
                getExerciseExplanationById() {
                    return new Promise((resolve, reject) => reject({}));
                }
            }
        })

        it("data.getExerciseExplanationById() should be called with body.entityId", () => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let dataSpy = spy(dataMock, "getExerciseExplanationById");

            controller.addComment(reqMock, resMock);
            expect(dataSpy.calledWith(reqMock.body.entityId)).to.be.true;
        });

        it("when an exercise is found, the comment should be pushed to the exercise's comments array", done => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(foundExercise.comments[0].content).to.equal(reqMock.body.content);
                    expect(foundExercise.comments[0].author).to.equal(reqMock.user.username);
                    expect(foundExercise.comments.length).to.equal(1);
                    done();
                });
        });

        it("when an exercise is found, ex.save() should be called after the comment is added", done => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let exerciseSpy = sinon.spy(foundExercise, "save");

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(exerciseSpy.calledOnce).to.be.true;
                    done();
                    exerciseSpy.restore();
                });
        });

        it("when an exercise is found, res.redirect() should be called after ex.save() is called", done => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
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
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataErrorMock, common: commonMock });
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
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataErrorMock, common: commonMock });
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

    describe("getAllCategoriesOfExercise() tests", () => {
        let exercises = [];
        let reqMock = {
            user: {},
            query: {
                category: ""
            }
        };
        let resMock = {
            render() {}
        };
        let dataMock = {
            getAllCategories() {
                return new Promise(resolve => resolve(exercises));
            }
        };
        let commonMock = {
            setIsAdminUser() {}
        };
        let userValidatorMock = {};

        it("data.getAllCategories() should be called", () => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let dataSpy = spy(dataMock, "getAllCategories");

            controller.getAllCategoriesOfExercise(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.render() should be called", done => {
            let controller = exercisesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
            let resSpy = spy(resMock, "render");

            controller
                .getAllCategoriesOfExercise(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });
});
