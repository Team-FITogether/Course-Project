/* globals describe it beforeEach afterEach */

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");


describe("ARTICLES-DATA-TESTS", () => {
    class Article {
        constructor(properties) {
            this.mainHeader = properties.mainHeader;
            this.subHeader = properties.subHeader;
            this.author = properties.author;
            this.imgSrc = properties.imgSrc;
            this.genre = properties.genre;
            this.body = properties.body;
            this.likes = properties.likes;
            this.deletedOn = properties.deletedOn;
            this.createdOn = properties.createdOn;
            this.usersLiked = properties.usersLiked;
            this.comments = properties.comments;
        }
        save() { }
        count() { }
        static find() { return this; }
        static findOne() { return this; }
        static findOneAndUpdate() { return this; }

        static select() { return this; }
        static exec() { return this; }
        static sort() { return this; }
        static limit() { return this; }
        static where() { return this; }
        static equals() { return this; }
        static skip() { return this; }
    }

    const data = require("./../../server/data/articles-data")({ Article });

    const articles = require("./../samples/sample-articles");

    describe("getArticleById(id)", () => {
        beforeEach(() => {
            sinon.stub(Article, "findOne", (query, callback) => {
                let id = query._id;
                let foundArticle = articles.find(a => a._id === id);
                callback(null, foundArticle);
            });
        });

        afterEach(() => {
            Article.findOne.restore();
        });

        it("Expect getArticleById() to return a signle article, if correct id is passed", done => {
            data.getArticleById(1)
                .then(foundArticle => {
                    expect(foundArticle).to.eql(articles[0]);
                    done();
                });
        });

        it("Expect getArticleById() to return null, if incorrect id is passed", done => {
            data.getArticleById(1337)
                .then(foundArticle => {
                    expect(foundArticle).to.be.null;
                    done();
                });
        });

        it("Expect getArticleById() to return null, when string is given as id", done => {
            data.getArticleById("1")
                .then(foundArticle => {
                    expect(foundArticle).to.be.null;
                    done();
                });
        });
    });

    describe("getArticlesByGenre(genre, page, pageSize)", () => {
        it("Expect getArticlesByGenre(genre, page, pageSize) to have all chained methods called - find().where().equals().skip().limit().exec()", done => {
            let findSpy = sinon.spy(Article, "find");
            let whereSpy = sinon.spy(Article, "where");
            let equalsSpy = sinon.spy(Article, "equals");
            let skipSpy = sinon.spy(Article, "skip");
            let limitSpy = sinon.spy(Article, "limit");
            let execSpy = sinon.spy(Article, "exec");

            data.getArticlesByGenre("injuries-article", 1, 2);

            expect(findSpy.calledOnce).to.be.true;
            expect(whereSpy.calledOnce).to.be.true;
            expect(equalsSpy.calledOnce).to.be.true;
            expect(skipSpy.calledOnce).to.be.true;
            expect(limitSpy.calledOnce).to.be.true;
            expect(execSpy.calledOnce).to.be.true;

            findSpy.restore();
            whereSpy.restore();
            equalsSpy.restore();
            skipSpy.restore();
            limitSpy.restore();
            execSpy.restore();

            done();
        });
    });

    describe("getArticlesByGenreAdminUser(genre, page, pageSize)", () => {
        it("Expect getArticlesByGenreAdminUser(genre, page, pageSize) to have all chained methods called - find().skip().limit().exec()", done => {
            let findSpy = sinon.spy(Article, "find");
            let skipSpy = sinon.spy(Article, "skip");
            let limitSpy = sinon.spy(Article, "limit");
            let execSpy = sinon.spy(Article, "exec");

            data.getArticlesByGenre("injuries-article", 1, 2);

            expect(findSpy.calledOnce).to.be.true;
            expect(skipSpy.calledOnce).to.be.true;
            expect(limitSpy.calledOnce).to.be.true;
            expect(execSpy.calledOnce).to.be.true;

            findSpy.restore();
            skipSpy.restore();
            limitSpy.restore();
            execSpy.restore();

            done();
        });
    });

    describe("getArticlesByTitle(title)", () => {
        beforeEach(() => {
            sinon.stub(Article, "findOne", (query, callback) => {
                let foundArticle = articles.find(a => a.mainHeader === query.mainHeader);
                callback(null, foundArticle);
            });
        });

        afterEach(() => {
            Article.findOne.restore();
        });

        it("Expect getArticlesByTitle(title) to return correct article, when existing title is passed", done => {
            data.getArticleByTitle("title")
                .then(foundArticle => {
                    expect(foundArticle).to.eql(articles[0]);
                    done();
                });
        });

        it("Expect getArticlesByTitle(title) to return null if article is not found", done => {
            data.getArticleByTitle("not existing title")
                .then(foundArticle => {
                    expect(foundArticle).to.be.null;
                    done();
                });
        });
    });

    describe("getArticlesByAuthor(author)", () => {

        it("Expect getArticlesByAuthor(author) to call all chined methods, find().where().equals().exec()", done => {
            let findSpy = sinon.spy(Article, "find");
            let whereSpy = sinon.spy(Article, "where");
            let equalsSpy = sinon.spy(Article, "equals");
            let execSpy = sinon.spy(Article, "exec");

            data.getArticlesByAuthor("FITogether");

            expect(findSpy.calledOnce).to.be.true;
            expect(whereSpy.calledOnce).to.be.true;
            expect(equalsSpy.calledOnce).to.be.true;
            expect(execSpy.calledOnce).to.be.true;

            findSpy.restore();
            whereSpy.restore();
            equalsSpy.restore();
            execSpy.restore();

            done();
        });
    });

    describe("getArticlesByAuthorAdminUser(author)", () => {
        beforeEach(() => {
            sinon.stub(Article, "find", (query, callback) => {
                let foundArticles = articles.filter(a => a.author === query.author);
                callback(null, foundArticles);
            });
        });

        afterEach(() => {
            Article.find.restore();
        });

        it("Expect getArticlesByAuthorAdminUser(author) to return correct articles, when an existing author is passed", done => {
            data.getArticlesByAuthorAdminUser("FITogether")
                .then(foundArticles => {
                    expect(foundArticles.length).to.equal(2);
                    done();
                });
        });
        it("Expect getArticlesByAuthorAdminUser(author) to return an empty array, when a non existing author is passed", done => {
            data.getArticlesByAuthorAdminUser("non existing author")
                .then(foundArticles => {
                    expect(foundArticles.length).to.equal(0);
                    done();
                });
        });
    });

    describe("createArticle(header, subheader, author, body, genre, img)", () => {
        beforeEach(() => {
            sinon.stub(Article.prototype, "save", (callback) => {
                callback(null);
            });
        });

        afterEach(() => {
            Article.prototype.save.restore();
        });

        it("Expect createArticle(header, subheader, author, body, genre, img) to create the article", done => {
            let articleTitle = "title";
            data.createArticle(articleTitle)
                .then(createdArticle => {
                    expect(createdArticle.mainHeader).to.equal(articleTitle);
                    done();
                });
        });
    });

    describe("updateArticle(id, update, options)", () => {
        beforeEach(() => {
            sinon.stub(Article, "findOneAndUpdate", (query, update, options, callback) => {
                let id = query._id;
                let foundArticle = articles.find(a => a._id === id);
                if (foundArticle)
                    foundArticle.likes += update;
                callback(null, foundArticle);
            });
        });

        afterEach(() => {
            Article.findOneAndUpdate.restore();
        });

        it("Expect updateArticle(id, update, options) to update article, when correct id and parameters are passed", done => {
            let update = 1; // simulates mongoose query { $inc: { likes: 1 } }
            let options = null;

            data.updateArticle(1, update, options)
                .then(updatedArticle => {
                    expect(updatedArticle.likes).to.equal(1);
                    done();
                });
        });

        it("Expect updateArticle(id, update, options) to return null when not existing id is passed", done => {
            let update = 1; // simulates mongoose query { $inc: { likes: 1 } }
            let options = null;

            data.updateArticle(1337, update, options)
                .then(updatedArticle => {
                    expect(updatedArticle).to.be.null;
                    done();
                });
        });
    });

    describe("findArticleByQueryWithSelectIdAndHeader(query)", () => {
        it("Expect all chained methods to be called - find().select().exec()", done => {
            let findSpy = sinon.spy(Article, "find");
            let selectSpy = sinon.spy(Article, "select");
            let execSpy = sinon.spy(Article, "exec");

            let query = { _id: 1 };

            data.findArticleByQueryWithSelectIdAndHeader(query);

            expect(findSpy.calledOnce).to.be.true;
            expect(selectSpy.calledOnce).to.be.true;
            expect(execSpy.calledOnce).to.be.true;

            done();
            findSpy.restore();
            selectSpy.restore();
            execSpy.restore();
        });
    });

    describe("getTopLikedArticles()", () => {
        it("Expect all chained methods to be called - find().sort().limit().exec()", done => {
            let findSpy = sinon.spy(Article, "find");
            let sortSpy = sinon.spy(Article, "sort");
            let limitSpy = sinon.spy(Article, "limit");
            let execSpy = sinon.spy(Article, "exec");

            data.getTopLikedArticles();

            expect(findSpy.calledOnce).to.be.true;
            expect(sortSpy.calledOnce).to.be.true;
            expect(limitSpy.calledOnce).to.be.true;
            expect(execSpy.calledOnce).to.be.true;

            done();

            findSpy.restore();
            sortSpy.restore();
            limitSpy.restore();
            execSpy.restore();
        });
    });

    describe("getAllArticles()", () => {
        it("Expect all chained methods to be called - find().select().exec()", done => {
            let findSpy = sinon.spy(Article, "find");
            let selectSpy = sinon.spy(Article, "select");
            let execSpy = sinon.spy(Article, "exec");

            data.getAllArticles();

            expect(findSpy.calledOnce).to.be.true;
            expect(selectSpy.calledOnce).to.be.true;
            expect(execSpy.calledOnce).to.be.true;

            done();

            findSpy.restore();
            selectSpy.restore();
            execSpy.restore();
        });
    });
});