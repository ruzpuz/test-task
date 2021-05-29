import dotenv from "dotenv";
import assert from 'assert';
import { execSync } from 'child_process';
import http, {AxiosResponse} from 'axios';
import { App } from "../app";
import {Status} from "../common/types/HTTP";
import data from './data';
import { Database } from "../common/database/Database";

dotenv.config();

const database = Database.get();
type AxiosError = { response: AxiosResponse<never>};

const BaseURL = `http://localhost:${process.env.EXPRESS_PORT}/api`;

const { TEST_USER_1, TEST_USER_2, TEST_USER_3, TEST_USER_4, TEST_USER_5 } = data;

function startApplication(): void {
    assert.doesNotThrow(async () => {
        const app = new App();
        await app.start();
    });
}
function databaseSeed(): void {
    assert.doesNotThrow(() => execSync('npm run knex seed:run --esm'))
}
async function databaseMigrations(): Promise<void> {
    await assert.doesNotReject(async () => database.migrate.latest());
}

async function applicationWorkingNormally() :Promise<void> {
    const { status } = await http.get(BaseURL + '/health');

    assert.strictEqual(status, Status.OK);
}
async function registerUsers(): Promise<void> {
    let response: AxiosResponse<never>;

    response = await http.post(BaseURL + '/signup', TEST_USER_1);
    assert.strictEqual(response.status, Status.CREATED)
    response = await http.post(BaseURL + '/signup', TEST_USER_2);
    assert.strictEqual(response.status, Status.CREATED)
    response = await http.post(BaseURL + '/signup', TEST_USER_3);
    assert.strictEqual(response.status, Status.CREATED)
}
async function preventDuplicateUserRegistration() :Promise<void> {
    try {
        const { status } = await http.post(BaseURL + '/signup', TEST_USER_1);
        assert.notStrictEqual(status, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.CONFLICT);
    }
}
async function badCredentialsLogin() :Promise<void> {
    const { email, password } = TEST_USER_1;
    try {
        const { status } = await http.post(BaseURL + '/login', { email, password: password + 'a' });
        assert.notStrictEqual(status, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.NOT_FOUND);
    }
}
async function successfulLogin() :Promise<void> {
    const { status } = await http.post(BaseURL + '/login', TEST_USER_1);
    assert.strictEqual(status, Status.OK);
}
async function disabledLogin() :Promise<void> {
    const { email, password } = TEST_USER_4;
    try {
        const { status } = await http.post(BaseURL + '/login', { email, password });
        assert.notStrictEqual(status, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.FORBIDDEN);
    }
}

async function unconfirmedLogin() :Promise<void> {
    const { email, password } = TEST_USER_5;
    try {
        const { status } = await http.post(BaseURL + '/login', { email, password });
        assert.notStrictEqual(status, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.FORBIDDEN);
    }
}

describe('Thorough application testing',function() :void {
    this.timeout(0);

    it('Application should start normally', startApplication);
    it('Application and its services should run normally', applicationWorkingNormally);
    it('Database should succesfully migrate to latest migration', databaseMigrations);
    it('Seed data should be successfully seeded', databaseSeed);
    it('Successfully register users endpoint', registerUsers);
    it('Duplicate users should not be able to register', preventDuplicateUserRegistration);
    it('Cannot login with bad credentials', badCredentialsLogin);
    it('Registered user can login', successfulLogin);
    it('Disabled user cannot login', disabledLogin);
    it('Unconfirmed user cannot login', unconfirmedLogin);
});
