/* globals describe it beforeEach afterEach */
"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const exercisesData = require("../../server/data/foods-data");

describe("EXERCISES-DATA-TESTS", () => {
    class ExerciseCategory {
        constructor(properties) {
            this.name = properties.name;
        }
        save() {}
        static find() {
            return this;
        }
    }

    class ExerciseExplanation {
        constructor(properties) {
            this.title = properties.title;
            this.content = properties.content;
            this.category = properties.category;
            this.author = properties.author;
            this.comments = properties.comments;
        }
        save() {}
        static findOne() {
            return this;
        }
        static findById() {
            return this;
        }
    }

    class Exercise {
        constructor(properties) {
            this.name = properties.name;
            this.imgSrc = properties.imgSrc;
            this.bodyPart = properties.bodyPart;
        }
        save() {}
        static find() {
            return this;
        }
        static select() {
            return this;
        }
        static exec() {
            return this;
        }
    }

    const data = require("./../../server/data/exercises-data")({ ExerciseCategory, ExerciseExplanation, Exercise });

    const explanations = require("./../samples/sample-exercise-explanations");

    describe("getSingleExercise(title)", () => {
        beforeEach(() => {
            sinon.stub(ExerciseExplanation, "findOne", (query, callback) => {
                let title = query.title;
                let foundExerciseExplanation = explanations.find(e => e.title === title);
                callback(null, foundExerciseExplanation);
            });
        });

        afterEach(() => {
            ExerciseExplanation.findOne.restore();
        });

        it("Expect getSingleExercise(title) to return a signle exercise, if correct title is passed", done => {
            data.getSingleExercise("test title")
                .then(foundExerciseExplanation => {
                    expect(foundExerciseExplanation).to.eql(explanations[0]);
                    done();
                });
        });

        it("Expect getSingleExercise() to return null, if incorrect title is passed", done => {
            data.getSingleExercise("incorrect title")
                .then(foundExerciseExplanation => {
                    expect(foundExerciseExplanation).to.be.null;
                    done();
                });
        });
    });

    describe("getAllCategories()", () => {
        it("Expect all find() to be called", done => {
            let findSpy = sinon.spy(ExerciseCategory, "find");

            data.getAllCategories();
            expect(findSpy.calledOnce).to.be.true;

            done();
            findSpy.restore();
        });
    });

    describe("getAllExercisesByCategory(category)", () => {
        it("Expect find() to be called", done => {
            let findSpy = sinon.spy(Exercise, "find");

            data.getAllExercisesByCategory("test category");
            expect(findSpy.calledOnce).to.be.true;

            done();
            findSpy.restore();
        });
    });

    describe("getAllExercises()", () => {
        it("Expect find() to be called", done => {
            let findSpy = sinon.spy(Exercise, "find");

            data.getAllExercises("test category");
            expect(findSpy.calledOnce).to.be.true;

            done();
            findSpy.restore();
        });
    });

    describe("getExerciseExplanationById(id)", () => {
        beforeEach(() => {
            sinon.stub(ExerciseExplanation, "findById", (id, callback) => {
                let foundExerciseExplanation = explanations.find(e => e._id === id);
                callback(null, foundExerciseExplanation);
            });
        });

        afterEach(() => {
            ExerciseExplanation.findById.restore();
        });

        it("Expect getExerciseExplanationById(id) to return a signle exercise-explanation, if correct id is passed", done => {
            data.getExerciseExplanationById(1)
                .then(foundExerciseExplanation => {
                    expect(foundExerciseExplanation).to.eql(explanations[0]);
                    done();
                });
        });

        it("Expect getExerciseExplanationById() to return null, if incorrect id is passed", done => {
            data.getExerciseExplanationById(2323)
                .then(foundExerciseExplanation => {
                    expect(foundExerciseExplanation).to.be.null;
                    done();
                });
        });

        it("Expect getExerciseExplanationById() to return null, when string is given as id", done => {
            data.getExerciseExplanationById("1")
                .then(foundExerciseExplanation => {
                    expect(foundExerciseExplanation).to.be.null;
                    done();
                });
        });
    });

    describe("findExerciseByQueryWithSelectIdAndName(query)", () => {
        it("Expect all chained methods to be called - find().select().exec()", done => {
            let findSpy = sinon.spy(Exercise, "find");
            let selectSpy = sinon.spy(Exercise, "select");
            let execSpy = sinon.spy(Exercise, "exec");

            data.findExerciseByQueryWithSelectIdAndName(1, "name");

            expect(findSpy.calledOnce).to.be.true;
            expect(selectSpy.calledOnce).to.be.true;
            expect(execSpy.calledOnce).to.be.true;

            done();

            findSpy.restore();
            selectSpy.restore();
            execSpy.restore();
        });
    });

    describe("addNewCategory(name)", () => {
        beforeEach(() => {
            sinon.stub(ExerciseCategory.prototype, "save", callback => {
                callback(null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect addNewCategory(name)) to save exercise-category with the correct property", done => {
            let newName = "new name";

            data.addNewCategory(newName)
                .then(newCategory => {
                    expect(newCategory.name).to.equal(newName);
                    done();
                });
        });
    });
});
