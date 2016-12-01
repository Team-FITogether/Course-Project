/* globals describe it */

"use strict";

const articlesController = require("../../server/controllers/articles-controller");

const sinon = require("sinon");
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("loadCreateArticlePage() tests", () => {
    let req = { user: {} };
    let res = { render() { } };
    let commonMock = { setIsAdminUser() { } };
    let userValidatorMock = {};

    it("common.setIsAdminUser() should be called once", () => {
        let dataMock = {};

        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        sinon.assert.calledOnce(commonSpy);
        commonSpy.restore();
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let dataMock = {};

        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        sinon.assert.calledWith(commonSpy, req, userValidatorMock);
        commonSpy.restore();
    });

    it("res.render() should be called once and with CREATE_ARTICLE_VIEW string and { user } object", () => {
        let dataMock = {};
        let CREATE_ARTICLE_VIEW = "articles/create-article";

        let resSpy = sinon.spy(res, "render");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        sinon.assert.calledWith(resSpy, CREATE_ARTICLE_VIEW, { user: req.user });
        resSpy.restore();
    });
});

describe("loadEditArticlePage() tests", () => {
    let reqMock = { body: { articleId: 1 }, user: {} };
    let resMock = { render() { } };
    let commonMock = { setIsAdminUser() { } };
    let userValidatorMock = {};
    let articleMock = {};
    let dataMock = {
        getArticleById() {
            return new Promise(resolve => resolve(articleMock));
        }
    };

    it("common.setIsAdminUser() should be called once with req and userValidator objects", () => {
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadEditArticlePage(reqMock, resMock);
        sinon.assert.calledWith(commonSpy, reqMock, userValidatorMock);
        commonSpy.restore();
    });

    it("data.getArticleById() should be called with id", () => {
        let articleId = 1;

        let dataSpy = sinon.spy(dataMock, "getArticleById");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadEditArticlePage(reqMock, resMock);
        sinon.assert.calledWith(dataSpy, articleId);
        dataSpy.restore();
    });

    it("res.render() should be called with EDIT_ARTICLE_VIEW string and { user, article } object", done => {
        let EDIT_ARTICLE_VIEW = "articles/edit-article";

        let resSpy = sinon.spy(resMock, "render");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller
            .loadEditArticlePage(reqMock, resMock)
            .then(() => {
                sinon.assert.calledWith(resSpy, EDIT_ARTICLE_VIEW, { user: reqMock.user, article: articleMock });
                resSpy.restore();
                done();
            });
    });
});
