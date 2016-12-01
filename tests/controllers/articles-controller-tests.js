/* globals describe it */

"use strict";

const articlesController = require("../../server/controllers/articles-controller");

const sinon = require("sinon");
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("loadCreateArticlePage() tests", () => {
    it("common.setIsAdminUser() should be called once", () => {
        let commonMock = { setIsAdminUser() { } };
        let dataMock = {};
        let req = {};
        let res = { render() { } };
        let userValidatorMock = {};

        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        sinon.assert.calledOnce(commonSpy);
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let commonMock = { setIsAdminUser() { } };
        let dataMock = {};
        let req = {};
        let res = { render() { } };
        let userValidatorMock = {};

        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        sinon.assert.calledWith(commonSpy, req, userValidatorMock);
    });

    it("res.render() should be called once and with CREATE_ARTICLE_VIEW string and { user } object", () => {
        let commonMock = { setIsAdminUser() { } };
        let dataMock = {};
        let req = { user: {} };
        let res = { render() { } };
        let userValidatorMock = {};
        let CREATE_ARTICLE_VIEW = "articles/create-article";

        let resSpy = sinon.spy(res, "render");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        sinon.assert.calledWith(resSpy, CREATE_ARTICLE_VIEW, { user: req.user });
    });
});

describe("loadEditArticlePage() tests", () => {
    it("common.setIsAdminUser() should be called once", () => {
        let reqMock = { body: { articleId: 1 } };
        let resMock = { render() { } };
        let commonMock = { setIsAdminUser() { } };
        let userValidatorMock = {};
        let dataMock = {
            getArticleById() {
                return new Promise(resolve => resolve({}));
            }
        };

        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadEditArticlePage(reqMock, resMock);
        sinon.assert.calledWith(commonSpy, reqMock, userValidatorMock);
    });
});
