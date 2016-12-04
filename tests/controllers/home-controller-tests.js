/* globals describe it */

"use strict";

const homeController = require("../../server/controllers/home-controller");

const expect = require("chai").expect;
const spy = require("sinon").spy;

describe("HOME-CONTROLLER-TESTS", () => {
    const HOME_VIEW = "home/home";

    let articles = [];
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
        render() { }
    };
    let dataMock = {
        getTopLikedArticles() {
            return new Promise(resolve => resolve(articles));
        }
    };
    let commonMock = {
        setIsAdminUser() { }
    };
    let userValidatorMock = {};

    let controller = homeController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

    describe("loadHomePage(req, res)", () => {
        it("Expect common.setIsAdminUser(req, userValidator) to be called", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.loadHomePage(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledOnce).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });

        });

        it("Expect common.setIsAdminUser(req, userValidator) to be called with req and useValidator objects", done => {
            let setIsAdminUser = spy(commonMock, "setIsAdminUser");
            controller.loadHomePage(reqMock, resMock)
                .then(() => {
                    expect(setIsAdminUser.calledWith(reqMock, userValidatorMock)).to.be.true;
                    setIsAdminUser.restore();
                    done();
                });

        });

        it("Expect data.getTopLikedArticles() to be called", done => {
            let getTopLikedArticlesSpy = spy(dataMock, "getTopLikedArticles");
            controller.loadHomePage(reqMock, resMock)
                .then(() => {
                    expect(getTopLikedArticlesSpy.calledOnce).to.be.true;
                    getTopLikedArticlesSpy.restore();
                    done();
                });

        });

        it("Expect res.render() to be called", done => {
            let resSpy = spy(resMock, "render");
            controller.loadHomePage(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledOnce).to.be.true;
                    resSpy.restore();
                    done();
                });
        });

        it("Expect res.render() to be called with HOME_VIEW string and correct render model", done => {
            let resSpy = spy(resMock, "render");
            let renderModel = { user: reqMock.user, articles };

            controller.loadHomePage(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(HOME_VIEW, renderModel)).to.be.true;
                    resSpy.restore();
                    done();
                });
        });
    });
});