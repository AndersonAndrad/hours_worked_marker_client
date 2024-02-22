import { createServer, Model } from 'miragejs';
import { Day, SubTask, Task, Work } from '@/interfaces/task.interface.ts';
import { generateHash } from '@/app/utils/base64.utils.ts';
import { faker } from '@faker-js/faker';


export const makeServer = () => {
    return createServer( {
        models: {
            work: Model.extend<Partial<Work>>( {} ),
            day: Model.extend<Partial<Day>>( {} ),
            task: Model.extend<Partial<Task>>( {} ),
            subTask: Model.extend<Partial<SubTask>>( {} ),
        },

        seeds( server ) {
            Array.from( { length: 2 } ).forEach( () => {
                server.create( 'work', {
                    _id: generateHash(),
                    name: faker.person.jobArea(),
                    enable: true,
                    tasks: []
                } as any );
            } );
        },

        routes() {
            this.namespace = 'api';

            /* work */
            this.get( '/works', ( schema ) => {
                const users = schema.all( 'work' ).models;
                return {
                    items: users
                };
            } );

            this.post( '/works', ( schema, request ) => {
                return schema.create( 'work', JSON.parse( request.requestBody ) );
            } );

            /* tasks */
            this.post( '/tasks', ( schema, request ) => {
                const body: { taskName: string } = request.requestBody as any;

                const task: Task = {
                    _id: generateHash(),
                    description: '',
                    finished: false,
                    name: body.taskName,
                    paused: false,
                    start: new Date(),
                    subTasks: []
                };

                return schema.create( 'task', task as any );
            } );
        },
    } );
};
