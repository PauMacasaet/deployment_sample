const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');

const app = require('../app');

const fixtures = require('./fixtures');

describe('CRUD stickers', () => {
    before((done) => {
        //run migrations
        knex.migrate.latest()
            .then(() => {
                return knex.seed.run();
            }).then(() => done());
    });

    it('Lists all records', (done) => {
        request(app)
            .get('/api/v1/stickers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                expect(response.body).to.deep.equal(fixtures.stickers);
                done();
            });
    });

    it('Show one record by ID', (done) => {
        request(app)
            .get('/api/v1/stickers/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.stickers[0]);
                done();
            });
    });

    it('Creates a record', (done) => {
        request(app)
            .post('/api/v1/stickers')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                fixtures.stickers.id = response.body.id;
                expect(response.body).to.deep.equal(fixtures.sticker);
                done();
            });
    });

    it('Updates a record', (done) => {
        fixtures.stickers.rating = 5;
        request(app)
            .put('/api/v1/stickers/3')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(fixtures.sticker);
                done();
            });
    });

    it('Deletes a record', (done) => {
        request(app)
            .delete('/api/v1/stickers/4')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal({
                    deleted: true
                });
                done();
            });
    });
});