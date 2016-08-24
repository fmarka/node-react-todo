import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import jQuery from "jquery";
import server from "../server";

let {
  assert,
  expect
} = chai;
chai.should();
chai.use(sinonChai);
chai.use(chaiHttp);

describe('BackendApp', () => {

  it('Should add todo item', (done) => {

    chai.request(server)
      .post('/add')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        title: 'Update todo app',
        text: 'Merge frontend & backend to the same node'
      })
      .end(function(err, res) {
        res.should.be.json;
        res.body.should.have.property('item');
        done();
      });

  });

});