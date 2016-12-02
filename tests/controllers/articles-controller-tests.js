/* globals describe it */

"use strict";

const articlesController = require("../../server/controllers/articles-controller");

const sinon = require("sinon");
const expect = require("chai").expect;

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
        expect(commonSpy.calledOnce).to.be.true;
        commonSpy.restore();
    });

    it("common.setIsAdminUser() should be called with req and userValidator objects", () => {
        let dataMock = {};

        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        expect(commonSpy.calledWith(req, userValidatorMock)).to.be.true;
        commonSpy.restore();
    });

    it("res.render() should be called once and with CREATE_ARTICLE_VIEW string and { user } object", () => {
        let dataMock = {};
        let CREATE_ARTICLE_VIEW = "articles/create-article";

        let resSpy = sinon.spy(res, "render");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadCreateArticlePage(req, res);
        expect(resSpy.calledWith(CREATE_ARTICLE_VIEW, { user: req.user })).to.be.true;
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
        expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
        commonSpy.restore();
    });

    it("data.getArticleById() should be called with id", () => {
        let articleId = 1;

        let dataSpy = sinon.spy(dataMock, "getArticleById");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller.loadEditArticlePage(reqMock, resMock);
        expect(dataSpy.calledWith(articleId)).to.be.true;
        dataSpy.restore();
    });

    it("res.render() should be called with EDIT_ARTICLE_VIEW string and { user, article } object", done => {
        let EDIT_ARTICLE_VIEW = "articles/edit-article";

        let resSpy = sinon.spy(resMock, "render");
        let controller = articlesController({ common: commonMock, userValidator: userValidatorMock, data: dataMock });

        controller
            .loadEditArticlePage(reqMock, resMock)
            .then(() => {
                expect(resSpy.calledWith(EDIT_ARTICLE_VIEW, { user: reqMock.user, article: articleMock })).to.be.true;
                resSpy.restore();
                done();
            });
    });
});

describe("loadArticlesByGenrePage() tests", () => {
    let ADMIN_ROLE = "admin";

    it("when req.user exists userValidator.isInRole() should be called to check if the user is admin with ADMIN_ROLE string and req.user", () => {
        let userValidatorMock = { isInRole() { } };
        let reqMock = { user: {}, query: { genre: "", page: 1 } };
        let resMock = { render() { }, status() { } };
        let commonMock = { setIsAdminUser() { } };
        let dataMock = {
            getArticlesByGenre() {
                return new Promise(resolve => resolve([1, 1, 1]));
            }
        };

        let userValidatorSpy = sinon.spy(userValidatorMock, "isInRole");
        let controller = articlesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });

        controller.loadArticlesByGenrePage(reqMock, resMock);
        expect(userValidatorSpy.calledWith(reqMock.user, ADMIN_ROLE)).to.be.true;
    });

    describe("when req.user exists and is Admin and", () => {
        it("common.setIsAdminUser() should be called in the private function loadArticlesByGenreForAdmin()", () => {
            let userValidatorMock = { isInRole() { return true; } };
            let reqMock = { user: {}, query: { genre: "", page: 1 } };
            let resMock = { render() { }, status() { } };
            let commonMock = { setIsAdminUser() { } };
            let dataMock = {
                getArticlesByGenre() {
                    return new Promise(resolve => resolve([1, 1, 1]));
                }
            };

            let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
            let controller = articlesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });

            controller.loadArticlesByGenrePage(reqMock, resMock);
            expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
            commonSpy.restore();
        });

        it("data.getArticlesByGenreAdminUser() return pages  that are less than page, res.render should be called with PAGE_NOW_FOUND_VIEW", done => {
            let PAGE_NOT_FOUND_VIEW = "error-pages/404-not-found";
            let userValidatorMock = { isInRole() { return true; } };
            let reqMock = { user: { isAdmin: true }, query: { genre: "", page: 1000 } };
            let resMock = { render() { }, status() { } };
            let commonMock = { setIsAdminUser() { } };
            let dataMock = {
                getArticlesByGenreAdminUser() {
                    return new Promise(resolve => resolve([1, 1]));
                }
            };

            let resSpy = sinon.spy(resMock, "render");
            let controller = articlesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });

            controller
                .loadArticlesByGenrePage(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(PAGE_NOT_FOUND_VIEW)).to.be.true;
                    done();
                });
        });

        it("data.getArticlesByGenreAdminUser() return pages  that are less than page, res.status should be called with 404", done => {
            let userValidatorMock = { isInRole() { return true; } };
            let reqMock = { user: { isAdmin: true }, query: { genre: "", page: 1000 } };
            let resMock = { render() { }, status() { } };
            let commonMock = { setIsAdminUser() { } };
            let dataMock = {
                getArticlesByGenreAdminUser() {
                    return new Promise(resolve => resolve([1, 1]));
                }
            };

            let resSpy = sinon.spy(resMock, "status");
            let controller = articlesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });

            controller
                .loadArticlesByGenrePage(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(404)).to.be.true;
                    done();
                });
        });

        it("everything is ok, res.render() should be called with ALL_ARTICLES_VIEW and object with render data.", done => {
            let ALL_ARTICLES_VIEW = "articles/all-articles";
            let userValidatorMock = { isInRole() { return true; } };
            let reqMock = { user: { isAdmin: true }, query: { genre: "", page: 1 } };
            let resMock = { render() { }, status() { } };
            let commonMock = { setIsAdminUser() { } };
            let dataMock = {
                getArticlesByGenreAdminUser() {
                    return new Promise(resolve => resolve([[], 10]));
                }
            };

            let resSpy = sinon.spy(resMock, "render");
            let controller = articlesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });

            controller
                .loadArticlesByGenrePage(reqMock, resMock)
                .then(() => {
                    let renderObject = {
                        user: reqMock.user,
                        articles: [],
                        page: 1,
                        pages: 2,
                        genre: ""
                    };

                    expect(resSpy.calledWith(ALL_ARTICLES_VIEW, renderObject)).to.be.true;
                    done();
                });
        });
    });

    describe("when req.user exists and is not Admin user", () => {
        it("when the page number greater than pages count res.render() should be called with PAGES_NOT_FOUND_VIEW", done => {
            let PAGES_NOT_FOUND_VIEW = "error-pages/404-not-found";
            let reqMock = { user: {}, query: { genre: "", page: 1 } };
            let resMock = { render() { }, status() { } };
            let userValidatorMock = { isInRole() { } };
            let commonMock = { setIsAdminUser() { } };
            let dataMock = {
                getArticlesByGenre() {
                    return new Promise(resolve => resolve([1, 1, 1]));
                }
            };

            let resSpy = sinon.spy(resMock, "render");
            let controller = articlesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });

            controller
                .loadArticlesByGenrePage(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(PAGES_NOT_FOUND_VIEW)).to.be.true;
                    done();
                });
        });

        it("when the page number greater than pages count res.status() should be called with 404", done => {
            let reqMock = { user: {}, query: { genre: "", page: 1 } };
            let resMock = { render() { }, status() { } };
            let userValidatorMock = { isInRole() { } };
            let commonMock = { setIsAdminUser() { } };
            let dataMock = {
                getArticlesByGenre() {
                    return new Promise(resolve => resolve([1, 1, 1]));
                }
            };

            let resSpy = sinon.spy(resMock, "status");
            let controller = articlesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });

            controller
                .loadArticlesByGenrePage(reqMock, resMock)
                .then(() => {
                    expect(resSpy.calledWith(404)).to.be.true;
                    done();
                });
        });

        it("when everything is ok res.render() should be called with ALL_ARTICLES_VIEW and render object", done => {
            let ALL_ARTICLES_VIEW = "articles/all-articles";
            let reqMock = { user: {}, query: { genre: "", page: 1 } };
            let resMock = { render() { }, status() { } };
            let userValidatorMock = { isInRole() { } };
            let commonMock = { setIsAdminUser() { } };
            let dataMock = {
                getArticlesByGenre() {
                    return new Promise(resolve => resolve([[], 10]));
                }
            };

            let resSpy = sinon.spy(resMock, "render");
            let controller = articlesController({ userValidator: userValidatorMock, common: commonMock, data: dataMock });

            controller
                .loadArticlesByGenrePage(reqMock, resMock)
                .then(() => {
                    let renderObject = {
                        user: reqMock.user,
                        articles: [],
                        page: 1,
                        pages: 2,
                        genre: ""
                    };

                    expect(resSpy.calledWith(ALL_ARTICLES_VIEW, renderObject)).to.be.true;
                    done();
                });
        });
    });
});

describe("loadSingleArticlePage() tests", () => {
    it("common.setIsAdminUser() should be called", () => {
        let userValidatorMock = {};
        let dataMock = {
            getArticleByTitle() {
                return new Promise(resolve => resolve({ comments: [] }));
            }
        };
        let commonMock = { setIsAdminUser() { } };
        let reqMock = { query: { title: "" } };
        let resMock = { render() { } };

        let commonSpy = sinon.spy(commonMock, "setIsAdminUser");
        let controller = articlesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.loadSingleArticlePage(reqMock, resMock);
        expect(commonSpy.calledWith(reqMock, userValidatorMock)).to.be.true;
    });

    it("data.getArticleByTitle() should be called with the title from the query", () => {
        let userValidatorMock = {};
        let dataMock = {
            getArticleByTitle() {
                return new Promise(resolve => resolve({ comments: [] }));
            }
        };
        let commonMock = { setIsAdminUser() { } };
        let reqMock = { query: { title: "" } };
        let resMock = { render() { } };

        let dataSpy = sinon.spy(dataMock, "getArticleByTitle");
        let controller = articlesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.loadSingleArticlePage(reqMock, resMock);
        expect(dataSpy.calledWith(reqMock.query.title)).to.be.true;
    });

    it("res.render() should be called with SINGLE_ARTICLE_VIEW and render object", done => {
        let SINGLE_ARTICLE_VIEW = "articles/single-article";
        let userValidatorMock = {};
        let reqMock = { query: { title: "" }, user: {} };
        let resMock = { render() { } };
        let dataMock = {
            getArticleByTitle() {
                return new Promise(resolve => resolve({
                    mainHeader: "main header",
                    subHeader: "subheader",
                    imgSrc: "imgsrc",
                    author: "author",
                    body: "body",
                    _id: "1234",
                    user: reqMock.user,
                    comments: []
                }));
            }
        };
        let commonMock = { setIsAdminUser() { } };

        let resSpy = sinon.spy(resMock, "render");
        let controller = articlesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
        let expectedArticle = {
            mainHeader: "main header",
            subHeader: "subheader",
            imgSrc: "imgsrc",
            author: "author",
            body: "body",
            id: "1234",
            user: reqMock.user,
            comments: []
        };

        controller
            .loadSingleArticlePage(reqMock, resMock)
            .then(() => {
                expect(resSpy.calledWith(SINGLE_ARTICLE_VIEW, expectedArticle)).to.be.true;
                done();
            });
    });
});

describe("createArticle() tests", () => {
    let reqMock = {
        body: {
            articleBody: "",
            articleHeader: "",
            articleSubHeader: "",
            articleGenre: ""
        },
        user: {
            username: ""
        }
    };
    let resMock = { redirect() { } };
    let dataMock = {
        createArticle() {
            return new Promise(resolve => resolve({}));
        }
    };
    let userValidatorMock = {};
    let commonMock = {};

    it("data.createArticle() should be called with articleHeader, articleSubHeader, req.user.username, articleBody, articleGenre, \"\"", () => {
        let dataSpy = sinon.spy(dataMock, "createArticle");
        let controller = articlesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });
        let body = reqMock.body;

        controller.createArticle(reqMock, resMock);
        expect(dataSpy.calledWith(body.articleHeader,
            body.articleSubHeader,
            reqMock.user.username,
            body.articleBody,
            body.articleGenre,
            ""));
    });

    it("res.redirect() should be called when everything is ok", done => {
        let resSpy = sinon.spy(resMock, "redirect");
        let controller = articlesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller
            .createArticle(reqMock, resMock)
            .then(() => {
                expect(resSpy.called).to.be.true;
                done();
            });
    });
});

describe("saveEditedArticle() tests", () => {
    let reqMock = {
        body: {
            articleBody: "body",
            articleHeader: "header",
            articleSubHeader: "subheader",
            articleId: "1111"
        },
        user: {
            username: "username"
        }
    };
    let resMock = { redirect() { } };
    let userValidatorMock = {};
    let commonMock = {};
    let dataMock = {
        updateArticle() {
            return new Promise(resolve => resolve({}));
        }
    };

    it("data.saveEditedArticle() should be called with articleId(from the body), update object and options object", () => {
        let dataSpy = sinon.spy(dataMock, "updateArticle");
        let controller = articlesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller.saveEditedArticle(reqMock, resMock);

        let expectedUpdate = {
            mainHeader: reqMock.body.articleHeader,
            subHeader: reqMock.body.articleSubHeader,
            body: reqMock.body.articleBody
        };
        let expectedOptions = { new: true };
        expect(dataSpy.calledWith(reqMock.body.articleId, expectedUpdate, expectedOptions)).to.be.true;
        dataSpy.restore();
    });

    it("res.render() should be called when everything is ok", done => {
        let resSpy = sinon.spy(resMock, "redirect");
        let controller = articlesController({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

        controller
            .saveEditedArticle(reqMock, resMock)
            .then(() => {
                expect(resSpy.calledOnce).to.be.true;
                resSpy.restore();
                done();
            });
    });
});