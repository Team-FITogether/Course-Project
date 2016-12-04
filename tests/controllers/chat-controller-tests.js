/* globals describe it */

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("CHAT-CONTROLLER-TESTS", () => {
    let commonMock = {
        setIsAdminUser() { }
    };
    let dataMock = {
        getUserByUsername() {
            return new Promise(resolve => resolve());
        }
    };
    let userValidatorMock = {};
    let resMock = {
        sseSetup() { },
        redirect() { },
        render() { }
    };
    let reqMock = {
        res: {},
        user: {
            username: "pencho"
        },
        query: {
            reciever: null
        }
    };

    let chatController = require("./../../server/controllers/chat-controller")({ userValidator: userValidatorMock, data: dataMock, common: commonMock });

    describe("stream(req, res)", () => {

        it("Expect res.sseSetup() to be called once.", () => {
            let sseSetupSpy = sinon.spy(resMock, "sseSetup");

            chatController.stream(reqMock, resMock);

            expect(sseSetupSpy.calledOnce).to.be.true;
            sseSetupSpy.restore();
        });
    });

    describe("handleInvitation(req, res)", () => {

        it("Expect res.redirect() to not be called when there is no reciver.", () => {
            let redirectSpy = sinon.spy(resMock, "redirect");

            chatController.handleInvitation(reqMock, resMock);

            expect(redirectSpy.called).to.be.false;
            redirectSpy.restore();
        });
    });

    describe("loadChatRoom(req, res)", () => {
        it("Expect res.render() to not be called", () => {
            let renderSpy = sinon.spy(resMock, "render");

            chatController.loadChatRoom(reqMock, resMock);

            expect(renderSpy.called).to.be.true;
            renderSpy.restore();
        });
    });
});