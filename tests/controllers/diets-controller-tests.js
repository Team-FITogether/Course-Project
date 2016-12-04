/* globals describe it */

"use strict";

const dietsController = require("../../server/controllers/diets-controller");

const sinon = require("sinon");
const expect = require("chai").expect;
const spy = require("sinon").spy;

describe("DIETS-CONTROLLER-TESTS", () => {
    describe("getAllDiets() tests", () => {
        let diets = [];
        let allDiets = [diets];
        let reqMock = {
            query: {
                page: 2
            }
        };
        let resMock = {
            render() {}
        };
        let commonMock = { setIsAdminUser() {} };
        let userValidatorMock = {};
        let dataMock = {
            getAllDiets() {
                return new Promise(resolve => resolve(allDiets));
            }
        };

        it("data.getAllDiets() should be called", () => {
            let controller = dietsController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });
            let dataSpy = spy(dataMock, "getAllDiets");

            controller.getAllDiets(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.render() should be called", done => {
            let controller = dietsController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });
            let resSpy = spy(resMock, "render");

            controller
                .getAllDiets(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("getSingleDiet() tests", () => {
        let diet = {
            _id: "",
            title: "",
            body: "",
            imgUrl: "",
            comments: [],
            user: {}
        };
        let reqMock = {
            query: [diet]
        };
        let resMock = {
            render() {}
        };
        let dataMock = {
            getSingleDiet() {
                return new Promise(resolve => resolve([diet]));
            }
        }

        it("data.getSingleDiet() should be called", () => {
            let controller = dietsController({ data: dataMock });
            let dataSpy = spy(dataMock, "getSingleDiet");

            controller.getSingleDiet(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.render() should be called", done => {
            let controller = dietsController({ data: dataMock });
            let resSpy = spy(resMock, "render");

            controller
                .getSingleDiet(reqMock, resMock)
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
        let foundDiet;
        let dataMock;
        let commonMock;
        let userValidatorMock;
        let dataErrorMock;

        beforeEach(() => {
            reqMock = {
                body: {
                    entityId: "010",
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
            foundDiet = {
                comments: [],
                save() {}
            };
            dataMock = {
                getDietById() {
                    return new Promise(resolve => resolve(foundDiet));
                }
            };
            dataErrorMock = {
                getDietById() {
                    return new Promise((resolve, reject) => reject({}));
                }
            };
        });

        it("data.getDietById() should be called with body.entityId", () => {
            let controller = dietsController({ data: dataMock });
            let dataSpy = spy(dataMock, "getDietById");

            controller.addComment(reqMock, resMock);
            expect(dataSpy.calledWith(reqMock.body.entityId)).to.be.true;
        });

        it("when diet is found, the comment should be pushed to the diet's comments array", done => {
            let controller = dietsController({ data: dataMock });

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(foundDiet.comments[0].content).to.equal(reqMock.body.content);
                    expect(foundDiet.comments[0].author).to.equal(reqMock.user.username);
                    expect(foundDiet.comments.length).to.equal(1);
                    done();
                });
        });

        it("when diet is found, diet.save() should be called after the comment is added", done => {
            let controller = dietsController({ data: dataMock });
            let dietSpy = sinon.spy(foundDiet, "save");

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(dietSpy.calledOnce).to.be.true;
                    done();
                    dietSpy.restore();
                });
        });

        it("when diet is found, res.redirect() should be called after diet.save() is called", done => {
            let controller = dietsController({ data: dataMock });
            let resSpy = sinon.spy(resMock, "redirect");

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    done();
                    resSpy.restore();
                });
        });

        it("when error appears, it should be caught and res.status() should be called with 500", done => {
            let controller = dietsController({ data: dataErrorMock });
            let resSpy = sinon.spy(resMock, "status");

            controller
                .addComment(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(500)).to.be.true;
                    done();
                    resSpy.restore();
                });
        });

        it("when error appears, it should be caught and res.send() should be called with err object", done => {
            let controller = dietsController({ data: dataErrorMock });
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

    describe("createDiet() tests", () => {
        let reqMock = {
            body: {
                dietTitle: "test title",
                dietBody: "test body"
            }
        };
        let resMock = {
            redirect() {}
        };
        let dataMock = {
            addNewDiet() {
                return new Promise(resolve => resolve({}));
            }
        };

        it("data.createDiet() should be called with with dietTitle and dietBody", () => {
            let dataSpy = sinon.spy(dataMock, "addNewDiet");
            let controller = dietsController({ data: dataMock });
            let body = reqMock.body;

            controller.createDiet(reqMock, resMock);
            expect(dataSpy.calledWith(body.dietTitle, body.dietBody));
        });

        it("res.redirect() should be called when everything is ok", done => {
            let resSpy = sinon.spy(resMock, "redirect");
            let controller = dietsController({ data: dataMock });

            controller
                .createDiet(reqMock, resMock)
                .then(() => {
                    expect(resSpy.called).to.be.true;
                    done();
                });
        });
    });

    describe("saveEditedDiet() tests", () => {
        let reqMock = {
            body: {
                dietId: "test id",
                dietTitle: "test title",
                dietBody: "test body"
            }
        };
        let resMock = {
            redirect() {}
        };
        let dataMock = {
            updateDiet() {
                return new Promise(resolve => resolve({}));
            }
        };

        it("data.saveEditedDiet() should be called with dietId (from the body), update object and options object", () => {
            let dataSpy = sinon.spy(dataMock, "updateDiet");
            let controller = dietsController({ data: dataMock });

            controller.saveEditedDiet(reqMock, resMock);

            let expectedUpdate = {
                title: reqMock.body.dietTitle,
                body: reqMock.body.dietBody
            };
            let expectedOptions = { new: true };
            expect(dataSpy.calledWith(reqMock.body.dietId, expectedUpdate, expectedOptions)).to.be.true;
            dataSpy.restore();
        });

        it("res.render() should be called when everything is ok", done => {
            let resSpy = sinon.spy(resMock, "redirect");
            let controller = dietsController({ data: dataMock });

            controller
                .saveEditedDiet(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });

    describe("deleteDiet() tests", () => {
        let reqMock;
        let resMock;
        let dataMock;

        beforeEach(() => {
            reqMock = {
                body: {
                    dietId: 1
                }
            };
            resMock = {
                redirect() {}
            };
            dataMock = {
                updateDiet() {
                    return new Promise(resolve => resolve({}));
                }
            };
        });

        it("data.updateDiet() should be called", () => {
            let controller = dietsController({ data: dataMock });
            let dataSpy = sinon.spy(dataMock, "updateDiet");

            controller.deleteDiet(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.redirect() should be called when everything is ok", done => {
            let controller = dietsController({ data: dataMock });
            let resSpy = sinon.spy(resMock, "redirect");

            controller
                .deleteDiet(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    done();
                });
        });
    });

    describe("restoreDiet() tests", () => {
        let reqMock;
        let resMock;
        let dataMock;

        beforeEach(() => {
            reqMock = {
                body: {
                    dietId: 1
                }
            };
            resMock = {
                redirect() {}
            };
            dataMock = {
                updateDiet() {
                    return new Promise(resolve => resolve({}));
                }
            };
        });

        it("data.updateDiet() should be called", () => {
            let controller = dietsController({ data: dataMock });
            let dataSpy = sinon.spy(dataMock, "updateDiet");

            controller.restoreDiet(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("res.redirect() should be called when everything is ok", done => {
            let controller = dietsController({ data: dataMock });
            let resSpy = sinon.spy(resMock, "redirect");

            controller
                .deleteDiet(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    done();
                });
        });
    });
});
