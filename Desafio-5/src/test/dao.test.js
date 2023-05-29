const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const requester = supertest('http://localhost:8080');


describe('testing products', () => {
    describe('test de productos', () => {
        it('El endpoint POST /api/products debe retornar unauthorized', async () => {
            const product =  {
                title: "iPhone 14 pro max",
                description: "256GB",
                price: 479,
                code: 69132,
                thumbnail: "iphone11.jpg",
                stock: 50,
                category: "iPhone"
            }

            const {
                statusCode,
                ok,
                _body
            } = await requester.post('/api/products').send(product)
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
            expect(statusCode).to.be.ok.and.deep.equal(401);
        })

        it('El endpoint GET /api/products debe retornar todos los productos', async() =>{
            const {
                statusCode,
                ok,
                _body
            } = await requester.get('/api/products')
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
        })

        it('El endpoint GET /api/products/:id debe retornar el producto seleccionado', async() => {
            const id = "63f0053d5478ce632f146630"
            const {
                statusCode,
                ok,
                _body
            } = await requester.get(`/api/products/${id}`)
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
        })
    })
})

describe('testing carts', () => {
    describe('test de cart', () => {
        it('El endpoint GET /api/carts debe retornar todos los carritos', async() => {
            const {
                statusCode,
                ok,
                _body
            } = await requester.get(`/api/carts`)
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
        })

        it('El endpoint GET /api/carts/:cid debe retornar el carrito seleccionado', async() => {
            const id = "6466adfe5ec1bb593a8d3bc1"
            const {
                statusCode,
                ok,
                _body
            } = await requester.get(`/api/carts/${id}`)
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
        })

        it('El endpoint DELETE /api/carts/:cid debe limpiar el carrito seleccionado', async() => {
            const id = "6466adfe5ec1bb593a8d3bc1"
            const {
                statusCode,
                ok,
                _body
            } = await requester.delete(`/api/carts/${id}`)
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
        })
    })
})

describe('testing sessions', () => {
    describe('test de sessions', () => {
        it('El endpoint POST /api/sessions/signup debe retornar 404', async () => {
            const user = {
                first_name: "Manuel",
                last_name: "Herrera",
                email: "manuelherrrera@gmail.com",
                password: "123",
                age: 33
            }
            const {statusCode} = await requester.post('/api/sessions/signup').send(user);
            expect(statusCode).to.be.ok.and.deep.equal(404);
        })

        it('El endpoint GET /api/sessions/login debe retornar el usuario logueado', async() => {
            const user = {
                email: "perez@gmail.com",
                password: "holamundo"
            }
            const {_body, statusCode, ok} = await requester.post('/api/sessions/login').send(user);
            console.log(statusCode)
            console.log(ok)
            console.log(_body)
        })
    })
})

