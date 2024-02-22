import { createServer, Model } from 'miragejs';

interface User {
    id: number;
    name: string;
    email: string;
}

export const makeServer = () => {
    return createServer({
        models: {
            user: Model.extend<Partial<User>>({}),
        },

        seeds(server){
            server.createList('user', 5);
        },

        routes() {
            this.namespace = 'api';

            this.get('/users', (schema) => {
                const users = schema.all('user').models
                return {
                    items: users
                }
            });

            this.post('/users', (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                return schema.create('user', attrs);
            });
        },
    });
}
