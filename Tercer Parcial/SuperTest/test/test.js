const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe("Test route", () => {
  it("should return 200 status code", () => {
    request("http://localhost:3000")
    .get("/alumnos")
    .end(function(err, res){
      expect(res.statusCode).to.equal(200);
    })
  })
})