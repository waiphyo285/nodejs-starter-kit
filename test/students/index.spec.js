const chaiHttp = require('chai-http')
const chai = require('chai')
const expect = chai.expect

chai.use(chaiHttp)

process.env.NODE_ENV = 'testing'

const app = require('../../app')
const testApp = chai.request(app)

// Import utils & model
const utils = require('@helpers/utils')
const Student = require('@models/mongodb/schemas/student')

const objectId = utils.objectId()

describe('Student APIs 🤖', () => {
    beforeEach((done) => {
        const newObj = {
            _id: objectId,
            name: 'howie',
            age: 16,
            grade: 11,
            status: true,
        }

        Student.create(newObj).then((res) => {})

        done()
    })

    after((done) => {
        Student.collection
            .drop()
            .then(() => {})
            .catch(() => {})

        done()
    })

    it('Get student by id should return 200', () => {
        testApp.get(`/api/v1/student/${objectId}`).end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.a('object')
            expect(res.body.code).to.equal('200')
            expect(res.body.data).to.have.a('object')
        })
    })

    it('Get student list should return 200', () => {
        testApp.get('/api/v1/student').end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.a('object')
            expect(res.body.code).to.equal('200')
            expect(res.body.data).to.have.a('array')
        })
    })

    it('A student created should return 200', () => {
        const newObj = {
            name: 'howie',
            age: 16,
            grade: 11,
            status: true,
        }

        testApp
            .post('/api/v1/student')
            .send(newObj)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.a('object')
                expect(res.body.code).to.equal('200')
                expect(res.body.data).to.have.a('object')
            })
    })

    it('A student updated should return 200', () => {
        const updatedObj = {
            name: 'neowie',
            age: 18,
        }

        testApp
            .put(`/api/v1/student/${objectId}`)
            .send(updatedObj)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.a('object')
                expect(res.body.code).to.equal('200')
                expect(res.body.data).to.have.a('object')
            })
    })

    it('A student delete should return 200', (done) => {
        testApp.delete(`/api/v1/student/${objectId}`).end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.have.a('object')
            expect(res.body.code).to.equal('200')
            expect(res.body.data).to.have.a('object')
            done()
        })
    })
})
