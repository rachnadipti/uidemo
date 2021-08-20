const assert=require('chai').assert;
const app = require('../app');
const sayHello=require('../app');

const chai = require('chai');
// var chaiHttp = require('chai-http');
var server = require('../app');
// faker = require('faker'),
should = chai.should();
// chai.use(chaiHttp);

describe('App',function(){

    it('app should return hello',function(){
    assert.equal(app(),'hello');

    });

    it('sayHello should return type string', function(){
    let result = sayHello();
    assert.typeOf(result,'string');
    });
  //  it('check app status', function (done) {
  //       chai.request(server).get('/').end((err, res) => {
  //         should.not.exist(err);
  //         res.should.have.status(200);
  //         done();
  //       })
  //   });

});