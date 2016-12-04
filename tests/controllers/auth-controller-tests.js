/* globals describe it */

"use strict";

const authController = require("../../server/controllers/auth-controller");

const sinon = require("sinon");
const expect = require("chai").expect;

describe("AUTH-CONTROLLER-TESTS", () => {
    let resMock = {
        render() { },
        end() { },
        json() { },
        status() { },
        redirect() { }
    };

    let reqMock = {
        body: {
            username: "testUsername"
        },
        logout() { }
    };

    let commonMock = {
        setIsAdminUser() { }
    };

    let userValidatorMock = {};

    let htmlEscaperMock = {
        escapeTags() {
            return "newUser";
        }
    };

    let encryptionProviderMock = {
        getSalt() {
            return "passSalt";
        },
        getPassHash() {
            return "passHash";
        }
    };

    let passportMock = {
        authenticate () {
            return function() {};
        }
    };

    describe("registerUser() tests", () => {

        it("common.setIsAdminUser() should be called once", () => {
            let dataMock = {
                getUserByUsername() {
                    return new Promise(resolve => resolve());
                },
                createUser() {
                    return new Promise(resolve => resolve());
                }
            };
            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.registerUser(reqMock, resMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });

        it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
            let dataMock = {
                getUserByUsername() {
                    return new Promise(resolve => resolve());
                },
                createUser() {
                    return new Promise(resolve => resolve());
                }
            };
            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.registerUser(reqMock, resMock);
            expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
            commonSpy.restore();
        });

        it("data.getUserByUsername() should be called once", () => {
            let dataMock = {
                getUserByUsername() {
                    return new Promise(resolve => resolve());
                },
                createUser() {
                    return new Promise(resolve => resolve());
                }
            };
            let dataSpy = sinon.spy(dataMock, "getUserByUsername");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.registerUser(reqMock, resMock);
            expect(dataSpy.calledOnce).to.be.true;
            dataSpy.restore();
        });

        it("data.createUser() should be called once if username is not existing in the database", done => {
            let dataMock = {
                getUserByUsername() {
                    return new Promise(resolve => resolve());
                },
                createUser() {
                    return new Promise(resolve => resolve());
                }
            };
            let dataSpy = sinon.spy(dataMock, "createUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.registerUser(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.true;
                    dataSpy.restore();
                    done();
                });
        });

        it("data.createUser() should not be called if username is existing in the database", done => {
            let foundUser = {
                username: "newUser"
            };
            let dataMock = {
                getUserByUsername() {
                    return new Promise(resolve => resolve(foundUser));
                },
                createUser() {
                    return new Promise(resolve => resolve());
                }
            };

            let dataSpy = sinon.spy(dataMock, "createUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.registerUser(reqMock, resMock)
                .then(() => {
                    expect(dataSpy.calledOnce).to.be.false;
                    dataSpy.restore();
                    done();
                });
        });

    });

    describe("loginUser() tests", () => {
        let nextMock = { };
        let dataMock = { };

        it("common.setIsAdminUser() should be called once", () => {
            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUser(reqMock, resMock, nextMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });

        it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUser(reqMock, resMock, nextMock);
            expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
            commonSpy.restore();
        });

        it("passport.authenticate() should be called once", () => {
            let commonSpy = sinon.spy(passportMock, "authenticate");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUser(reqMock, resMock, nextMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });
    });

    describe("loginUserFacebook() tests", () => {
        let nextMock = { };
        let dataMock = { };

        it("common.setIsAdminUser() should be called once", () => {
            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUser(reqMock, resMock, nextMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });

        it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUser(reqMock, resMock, nextMock);
            expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
            commonSpy.restore();
        });

        it("passport.authenticate() should be called once", () => {
            let commonSpy = sinon.spy(passportMock, "authenticate");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUserFacebook(reqMock, resMock, nextMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });
    });

    describe("loginUserGoogle() tests", () => {
        let nextMock = { };
        let dataMock = { };

        it("common.setIsAdminUser() should be called once", () => {
            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUserGoogle(reqMock, resMock, nextMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });

        it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUser(reqMock, resMock, nextMock);
            expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
            commonSpy.restore();
        });

        it("passport.authenticate() should be called once", () => {
            let commonSpy = sinon.spy(passportMock, "authenticate");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loginUser(reqMock, resMock, nextMock);
            expect(commonSpy.calledOnce).to.be.true;
            commonSpy.restore();
        });
    });

    describe("logoutUser() tests", () => {
        let dataMock = { };
        it("req.logout() should be called once", () => {
            let reqSpy = sinon.spy(reqMock, "logout");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.logoutUser(reqMock, resMock);
            expect(reqSpy.calledOnce).to.be.true;
            reqSpy.restore();
        });
        it("res.redirect() should be called once", () => {
            let resSpy = sinon.spy(resMock, "redirect");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.logoutUser(reqMock, resMock);
            expect(resSpy.calledOnce).to.be.true;
            resSpy.restore();
        });
    });

    describe("loadLoginPage() tests", () => {
        let dataMock = { };

        it("res.render() should be called once", () => {
            let resSpy = sinon.spy(resMock, "render");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loadLoginPage(reqMock, resMock);
            expect(resSpy.calledOnce).to.be.true;
            resSpy.restore();
        });

        it("res.render() should be called with correct view", () => {
            let resSpy = sinon.spy(resMock, "render");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });
            let userLoginView = "user/login";
            controller.loadLoginPage(reqMock, resMock);
            expect(resSpy.calledWith(userLoginView)).to.be.true;
            resSpy.restore();
        });
    });

    describe("loadRegisterPage() tests", () => {
        let dataMock = { };

        it("res.render() should be called once", () => {
            let resSpy = sinon.spy(resMock, "render");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });

            controller.loadRegisterPage(reqMock, resMock);
            expect(resSpy.calledOnce).to.be.true;
            resSpy.restore();
        });

        it("res.render() should be called with correct view", () => {
            let resSpy = sinon.spy(resMock, "render");
            let controller = authController({ userValidator: userValidatorMock, passport: passportMock, encryptionProvider: encryptionProviderMock, common: commonMock, data: dataMock, htmlEscaper: htmlEscaperMock });
            let userLoginView = "user/register";
            controller.loadRegisterPage(reqMock, resMock);
            expect(resSpy.calledWith(userLoginView)).to.be.true;
            resSpy.restore();
        });
    });
});
