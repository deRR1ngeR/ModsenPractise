import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';
import { CreateMeetupDto } from '../api/modules/meetups/dto/create-meetup.dto';
import { AppModule } from '../api/app.module';
import { CreateUserDto } from 'src/api/modules/users/dto/create-user.dto';

const loginDto: CreateUserDto = {
    email: 'admin@mail.ru',
    password: 'string'
}

const testDto: CreateMeetupDto = {
    name: 'String',
    tags: ['dsa', 'dsa'],
    date: new Date('2023-08-13T13:20:50.348Z'),
    location: 'Belarus, Minsk'
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdId: number;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const req = await request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto);
        token = req.body.accessToken;
    });

    it('/meetup (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/meetup')
            .set('Authorization', 'Bearer ' + token)
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                createdId = body.id;
                expect(createdId)
                    .toBeDefined();
            })
    });

    it('/meetup (POST) - fail', async () => {
        return request(app.getHttpServer())
            .post('/meetup')
            .set('Authorization', 'Bearer ' + +token)
            .send(testDto)
            .expect(401)
    });

    it('/meetup/:id (PATCH) - success ', async () => {
        return request(app.getHttpServer())
            .patch('/meetup/' + createdId)
            .set('Authorization', 'Bearer ' + token)
            .send(testDto)
            .expect(200)
    })


    it('/meetup/:id (PATCH) - fail', async () => {
        return request(app.getHttpServer())
            .patch('/meetup/' + 0)
            .set('Authorization', 'Bearer ' + token)
            .send(testDto)
            .expect(404)
    })


    it('/meetup/:id (DELETE) - success', async () => {
        return request(app.getHttpServer())
            .delete('/meetup/' + createdId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    })

    it('/meetup/:id (DELETE) - fail', async () => {
        return request(app.getHttpServer())
            .delete('/meetup/' + undefined)
            .set('Authorization', 'Bearer ' + token)
            .expect(404);
    })



    afterAll(async () => {
        await app.close();
    });
});
