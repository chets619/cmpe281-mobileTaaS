var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('MTaaS Backend Testing', function () {

    it('GET Try getting profile of a user', function () {
        agent.get('/profile/getUser/5e93cc92e8d62c4f2cb89ae6')
            .then(function (res) {
                console.log('Result', res.body);
                expect(res.body.success).equals(true);

            });
    });
})