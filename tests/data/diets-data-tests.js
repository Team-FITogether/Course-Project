/* globals describe it beforeEach afterEach */

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("diets-data tests", () => {
    class Diet {
        constructor(properties) {
            this.title = properties.title;
            this.body = properties.body;
            this.comments = properties.comments;
        }
        save() {}
        count() {}

        static find() {
            return this;
        }
        static findOne() {
            return this;
        }
        static findOneAndUpdate() {
            return this;
        }

        static select() {
            return this;
        }
        static exec() {
            return this;
        }
        static skip() {
            return this;
        }
        static limit() {
            return this;
        }
        static count() {
            return this;
        }
    }

    const data = require("./../../server/data/diets-data")({ Diet });

    const diets = require("./../samples/sample-diets");

    describe("getDietById(id)", () => {
        beforeEach(() => {
            sinon.stub(Diet, "findOne", (query, callback) => {
                let id = query._id;
                let foundDiet = diets.find(d => d._id === id);
                callback(null, foundDiet);
            });
        });

        afterEach(() => {
            Diet.findOne.restore();
        });

        it("Expect getDietById() to return a signle diet, if correct id is passed", done => {
            data.getDietById(1)
                .then(foundDiet => {
                    expect(foundDiet).to.eql(diets[0]);
                    done();
                });
        });

        it("Expect getDietById() to return null, if incorrect id is passed", done => {
            data.getDietById(2323)
                .then(foundDiet => {
                    expect(foundDiet).to.be.null;
                    done();
                });
        });

        it("Expect getDietById() to return null, when string is given as id", done => {
            data.getDietById("1")
                .then(foundDiet => {
                    expect(foundDiet).to.be.null;
                    done();
                });
        });
    });

    describe("getAllDiets(page, pageSize)", () => {
        it("Expect all chained methods to be called - find().skip().limit().exec()", done => {
            let findSpy = sinon.spy(Diet, "find");
            let skipSpy = sinon.spy(Diet, "skip");
            let limitSpy = sinon.spy(Diet, "limit");
            let execSpy = sinon.spy(Diet, "exec");

            data.getAllDiets(1, 1);

            expect(findSpy.calledOnce).to.be.true;
            expect(skipSpy.calledOnce).to.be.true;
            expect(limitSpy.called).to.be.true;
            expect(execSpy.calledOnce).to.be.false;

            done();

            findSpy.restore();
            skipSpy.restore();
            limitSpy.restore();
            execSpy.restore();
        });

        it("Expect count() to be called", done => {
            let countSpy = sinon.spy(Diet, "count");

            data.getAllDiets(1, 1);
            expect(countSpy.calledOnce).to.be.true;

            done();
            countSpy.restore();
        });
    });

    describe("getSingleDiet(title)", () => {
        beforeEach(() => {
            sinon.stub(Diet, "findOne", (query, callback) => {
                let foundDiet = diets.find(d => d.title === query.title);
                callback(null, foundDiet);
            });
        });

        afterEach(() => {
            Diet.findOne.restore();
        });

        it("Expect getSingleDiet(title) to return correct diet, when existing title is passed", done => {
            data.getSingleDiet("test title")
                .then(foundDiet => {
                    expect(foundDiet).to.eql(diets[0]);
                    done();
                });
        });

        it("Expect getSingleDiet(title) to return null if diet is not found", done => {
            data.getSingleDiet("not existing title")
                .then(foundDiet => {
                    expect(foundDiet).to.be.null;
                    done();
                });
        });
    });

});
