const request = require("supertest");
const app = require("../index");

describe("API Happyart", () => {

    let email = '';
    let token = '';
    let id = '';
    let product_id = '';

    it("Registrar un nuevo usuario y devolver un código 201", async () => {
        const randomNum = Math.floor(Math.random() * 1000);
        email = `masakokimura_${randomNum}@happyart.com`;
        const newUser = {
            firstname: "Masako",
            lastname: "Kimura",
            email: email,
            password: "password_12345",
            phone: "+56986351811",
            "addresses": [
              {
                "tipo": "casa",
                "direccion": "123 Calle Principal, Santiago"
              }
            ]
        };
        const response = await request(app).post("/happyart/api/v1/users").send(newUser);
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body).toHaveProperty('firstname', newUser.firstname);
        expect(response.body).toHaveProperty('lastname', newUser.lastname);
        expect(response.body).toHaveProperty('message', "Usuario registrado correctamente");
      });

        it("Iniciar sesión con un usuario registrado y devolver un código 200", async () => {       
        const user = {
            email: email,
            password: "password_12345"
        };  
        const response = await request(app).post("/happyart/api/v1/users/login").send(user);
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body).toHaveProperty('token');
        id = response.body.id;
        token = response.body.token;
        });

        it("Obtener datos del usuario y devolver un código 200", async () => {
            const response = await request(app).get(`/happyart/api/v1/users/${id}`).set('Authorization', token).send();
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it("Registrar un nuevo producto y devolver un código 201", async () => {
            const newProduct = {
                    description: "Llaveros con notas adhesivas de Pikachu",
                    price: 4490,
                    stock: 50,
                    other_attributes: {
                        "gr": 300
                    },
                    type_id: 24,
                    theme_id: 6,
                    img: "https://www.ecartelera.com/carteles-series/300/380/001_p.jpg"
            };
            tokenAdm = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImVtYWlsIjoiYWRtaW5pc3RyYWRvckBoYXBweWFydC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzE4MDM3MzZ9.eUJLhv_lwKS0-oF8vRwivNprXwZ8U6lOsbeDtFmTjOg";
            const response = await request(app).post("/happyart/api/v1/products").set('Authorization', tokenAdm).send(newProduct);
            expect(response.statusCode).toBe(201);
            expect(typeof response.body).toBe('object');
            expect(response.body).toHaveProperty('description', newProduct.description);
            expect(response.body).toHaveProperty('stock', newProduct.stock);
            product_id = response.body.id;
            console.log("product_id: ", product_id);
        });

        it("Obtener un producto por ID y devolver un código 200", async () => {
            const response = await request(app).get(`/happyart/api/v1/products/${product_id}`).send();
            expect(response.statusCode).toBe(200);
            expect(typeof response.body).toBe('object');
            expect(response.body).toHaveProperty('product_id');
            expect(response.body).toHaveProperty('description');
            expect(response.body).toHaveProperty('price');
            expect(response.body).toHaveProperty('stock');
        }, 3000);
});
