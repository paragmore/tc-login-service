import "reflect-metadata";
import { Container } from 'inversify';
import { AuthController } from './controllers/auth.controller';
import { AuthRepo } from './repo/auth.repo';
import { AuthService } from './service/auth.service';

const container = new Container();

container.bind<AuthService>(AuthService).toSelf();
container.bind<AuthRepo>(AuthRepo).toSelf();
container.bind<AuthController>(AuthController).toSelf()

export default container;