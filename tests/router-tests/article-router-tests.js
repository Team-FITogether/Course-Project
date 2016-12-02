///* globals describe it beforeEach afterEach */

//"use strict";

//const chai = require("chai");
//const expect = require("chai").expect;
//const sinon = require("sinon");
//const chaiHttp = require("chai-http");

//chai.use(chaiHttp);

//let userValidator = require("./../mocks/mock-user-validator");

//let data = require("./../../server/data")();
//let config = require("./../../server/configurations");
//let passport = require("passport");
//const app = require("./../../server/configurations/express")({ config, data });
//let common = require("./../../server/utils/common");
//let htmlEscaper = {};

//const encryption = require("./../../server/utils/encryption");
//const controllers = require("./../../server/controllers")({ app, config, userValidator, passport, encryption, data });
//const controllers = require("./../mocks/mock-controllers");
//const articles = require("./../../server/controllers/articles-controller")({ userValidator, common, data });
//let controllers = { articles };

//require("./../../server/configurations/database")(config);
//require("./../../server/configurations/passport")({ app, data });
//require("./../../server/routers/articles-router")({ app, config, userValidator, controllers });
//require("./../../server/routers/articles-router")({ app, userValidator, controllers });

//describe("article-route tests", () => {

//    it("GET /articles/create -> should return", (done) => {
//        chai.request(app)
//            .get("/articles/create")
//            .end((req, res) => {
//                expect(res.status).to.equal(2100)
//                done();
//            });
//    });
//    it("spai", (done) => {
//        let articlesSpy = sinon.spy(controllers.articles, "loadCreateArticlePage")
//        chai.request(app)
//            .get("/articles/create")
//            .end(() => {
//                expect(articlesSpy.called).to.be.true;
//                done()
//            });
//    });
//});