/* globals describe it */

const articlesController = require("../../server/controllers/articles-controller");

const sinon = require("sinon");
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("loadCreateArticlePage tests", () => {
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
        commonSpy.restore();
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let commonMock = { setIsAdminUser() { } };
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let dataMock = {};
        let req = {};
        let res = { render() { } };

        let userValidatorMock = {};
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        sinon.assert.calledWith(commonSpy, req, userValidatorMock);
        commonSpy.restore();
    });

    it("res.render() should be called once and with CREATE_ARTICLE_VIEW string and { user } object", () => {
        let commonMock = { setIsAdminUser() { } };
        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let dataMock = {};
        let req = {};
        let res = { render() { } };
    });
});
