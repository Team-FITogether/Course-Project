/* globals it describe */

"use strict";

const expect = require("chai").expect;
const spy = require("sinon").spy;
const userController = require("../../server/controllers/user-controller");

describe("USER-CONTROLLER-TESTS", () => {
    describe("loadProfilePage() tests", () => {
        let commonMock = {
            setIsAdminUser() {},
            setIsTrainerUser() {}
        };
        let userValidatorMock = {};
        let dataMock = {
            getAllExercises() {
                return new Promise(resolve => resolve({}));
            },
            getArticlesByAuthor() {
                return new Promise(resolve => resolve({}));
            },
            getAllFoodDetails() {
                return new Promise(resolve => resolve({}));
            },
            getAllFriendships() {
                return new Promise(resolve => resolve([]));
            }
        };
        let reqMock = {
            user: {
                "_id": "1",
                "username": "teod_st",
                "firstname": "Teodora",
                "lastname": "Stoyanova",
                "avatarName": "1",
                "passHash": "1",
                "salt": "1",
                "roles": [
                    "trainer",
                    "admin"
                ],
                "__v": 0,
                "calendar": {
                    "workouts": [],
                    "menus": []
                }
            }
        };
        let resMock = {
            render() {}
        };

        it("commonMock.setIsAdminUser() should be called", () => {
            let commonSpy = spy(commonMock, "setIsAdminUser");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.loadProfilePage(reqMock, resMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });

        it("commonMock.setIsTrainerUser() should be called", () => {
            let commonSpy = spy(commonMock, "setIsTrainerUser");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.loadProfilePage(reqMock, resMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });
    });

    describe("loadFoundUserProfilePage() tests", () => {
        let commonMock = {
            setIsAdminUser() {},
            setIsTrainerUser() {}
        };

        let userValidatorMock = {};
        let user = {
            "_id": 5,
            "username": "unicorn"
        };

        let friendship = {
            "_id": 5
        };

        let dataMock = {
            getAllExercises() {
                return new Promise(resolve => resolve({}));
            },
            getArticlesByAuthor() {
                return new Promise(resolve => resolve({}));
            },
            getAllFoodDetails() {
                return new Promise(resolve => resolve({}));
            },
            getUserById() {
                return new Promise(resolve => resolve(user));
            },
            getSingleFriendship() {
                return new Promise(resolve => resolve(friendship));
            },
            getAllFriendships() {
                return new Promise(resolve => resolve([]));
            },
            getUserByUsername() {
                return new Promise(resolve => resolve(user));
            }
        };

        let reqMock = {
            user: {
                "_id": "1",
                "username": "teod_st",
                "firstname": "Teodora",
                "lastname": "Stoyanova",
                "avatarName": "1",
                "passHash": "1",
                "salt": "1",
                "roles": [
                    "trainer",
                    "admin"
                ],
                "__v": 0,
                "calendar": {
                    "workouts": [],
                    "menus": []
                }
            },
            query: {
                "id": 5
            }
        };

        let resMock = {
            render() {},
            redirect() {}
        };

        it("commonMock.setIsAdminUser() should be called", () => {
            let commonSpy = spy(commonMock, "setIsAdminUser");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.loadProfilePage(reqMock, resMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });

        it("data.getUserById() should be called", () => {
            let commonSpy = spy(dataMock, "getUserById");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.loadFoundUserProfilePage(reqMock, resMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });

        it("res.redirect() should be called when logged user is same with searched", () => {
            let commonSpy = spy(resMock, "redirect");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            reqMock.user._id = 5;

            controller.loadFoundUserProfilePage(reqMock, resMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();

            reqMock.user._id = 1;
        });

        it("res.render() should be called once", done => {
            let resSpy = spy(resMock, "render");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.loadFoundUserProfilePage(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    done();
                    resSpy.restore();
                });
        });

        it("data.getSingleFriendship() should be called once", done => {
            let dataSpy = spy(dataMock, "getSingleFriendship");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.loadFoundUserProfilePage(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.called).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });

        it("data.getUserByUsername() should be called once", () => {
            let dataSpy = spy(dataMock, "getUserByUsername");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            reqMock.query.username = "monkey";

            controller.loadFoundUserProfilePage(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });
    });

    describe("requestFriendship() tests", () => {
        let commonMock = {};
        let userValidatorMock = {};

        let friendship = {
            "firstUser": {
                "username": "unicron",
                "_id": 5
            },
            "secondUser": {
                "username": "catlover",
                "_id": 2
            },
            "approved": false,
            "isRejected": false
        };

        let requestedUser = {
            "username": "catlover",
            "_id": 2
        };

        let dataMock = {
            findUserByQuery() {
                return new Promise(resolve => resolve(requestedUser));
            },
            getSingleFriendship() {
                return new Promise(resolve => resolve());
            },
            addNewFriendships() {
                return new Promise(resolve => resolve(friendship));
            }
        };

        let reqMock = {
            user: {
                "_id": "1",
                "username": "teod_st",
                "firstname": "Teodora",
                "lastname": "Stoyanova",
                "avatarName": "1",
                "passHash": "1",
                "salt": "1",
                "roles": [
                    "trainer",
                    "admin"
                ],
                "__v": 0,
                "calendar": {
                    "workouts": [],
                    "menus": []
                }
            },
            body: {
                "requestedUsername": "cats"
            }
        };

        let resMock = {
            sendStatus() {}
        };

        it("data.findUserByQuery() should be called twice", done => {
            let dataSpy = spy(dataMock, "findUserByQuery");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.requestFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledTwice).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });

        it("data.getSingleFriendship() should be called once", done => {
            let dataSpy = spy(dataMock, "getSingleFriendship");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.requestFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.called).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });

        it("data.addNewFriendships() should be called once", done => {
            let dataSpy = spy(dataMock, "addNewFriendships");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.requestFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });
    });

    describe("approveFriendship() tests", () => {
        let commonMock = {};
        let userValidatorMock = {};

        let friendship = {
            "firstUser": {
                "username": "unicron",
                "_id": 5
            },
            "secondUser": {
                "username": "catlover",
                "_id": 2
            },
            "approved": false,
            "isRejected": false
        };

        let requestedUser = {
            "username": "catlover",
            "_id": 2
        };

        let dataMock = {
            findUserByQuery() {
                return new Promise(resolve => resolve(requestedUser));
            },
            getSingleFriendship() {
                return new Promise(resolve => resolve());
            },
            updateFriendship() {
                return new Promise(resolve => resolve(friendship));
            }
        };

        let reqMock = {
            user: {
                "_id": "1",
                "username": "teod_st",
                "firstname": "Teodora",
                "lastname": "Stoyanova",
                "avatarName": "1",
                "passHash": "1",
                "salt": "1",
                "roles": [
                    "trainer",
                    "admin"
                ],
                "__v": 0,
                "calendar": {
                    "workouts": [],
                    "menus": []
                }
            },
            body: {
                "approvedUsername": "cats"
            }
        };

        let resMock = {
            sendStatus() {}
        };

        it("data.getSingleFriendship() should be called once", done => {
            let dataSpy = spy(dataMock, "getSingleFriendship");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.approveFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });

        it("data.updateFriendship() should be called once", done => {
            let dataSpy = spy(dataMock, "updateFriendship");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.approveFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });

        it("res.sendStatus() should be called once", done => {
            let dataSpy = spy(resMock, "sendStatus");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.approveFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });
    });

    describe("rejectFriendship() tests", () => {
        let commonMock = {};
        let userValidatorMock = {};

        let friendship = {
            "firstUser": {
                "username": "unicron",
                "_id": 5
            },
            "secondUser": {
                "username": "catlover",
                "_id": 2
            },
            "approved": false,
            "isRejected": false
        };

        let requestedUser = {
            "username": "catlover",
            "_id": 2
        };

        let dataMock = {
            findUserByQuery() {
                return new Promise(resolve => resolve(requestedUser));
            },
            getSingleFriendship() {
                return new Promise(resolve => resolve());
            },
            rejectFriendship() {
                return new Promise(resolve => resolve(friendship));
            }
        };

        let reqMock = {
            user: {
                "_id": "1",
                "username": "teod_st",
                "firstname": "Teodora",
                "lastname": "Stoyanova",
                "avatarName": "1",
                "passHash": "1",
                "salt": "1",
                "roles": [
                    "trainer",
                    "admin"
                ],
                "__v": 0,
                "calendar": {
                    "workouts": [],
                    "menus": []
                }
            },
            body: {
                "disapprovedUsername": "cats"
            }
        };

        let resMock = {
            sendStatus() {}
        };

        it("data.getSingleFriendship() should be called once", done => {
            let dataSpy = spy(dataMock, "getSingleFriendship");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.rejectFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });

        it("data.rejectFriendship() should be called once", done => {
            let dataSpy = spy(dataMock, "rejectFriendship");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.rejectFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });

        it("res.sendStatus() should be called once", done => {
            let dataSpy = spy(resMock, "sendStatus");
            let controller = userController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

            controller.rejectFriendship(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.true;
                    done();
                    dataSpy.restore();
                });
        });
    });
});