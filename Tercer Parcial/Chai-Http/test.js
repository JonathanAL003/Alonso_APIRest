const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("My Express Server", () => {
  it("should respond with 'Hello World!'", (done) => {
    chai.request("http://localhost:3000")
      .get("/")
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.equal("Hello World!");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});