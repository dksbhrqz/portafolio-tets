let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Get user information: ',()=>{
    it('should get user work experience', (done) => {
        chai.request(url)
        .get('/workExperience')
        .end(function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should get information key', (done) => {
        chai.request(url)
        .get('/workExperience')
        .end(function(err,res){
            expect(res.body).to.be.have.key('information')
            done();
        });
    });
});

describe('Update user information: ',()=>{
    it('should get a bad request when body is not sent', (done) => {
        chai.request(url)
        .put('/workExperience')
        .end(function(err,res){
            expect(res).to.have.status(400);
            done();
        });
    });    
});