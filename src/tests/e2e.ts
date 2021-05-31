import dotenv from "dotenv";
import assert from 'assert';
import { execSync } from 'child_process';
import http, {AxiosResponse} from 'axios';
import { App } from "../app";
import {Status} from "../common/types/HTTP";
import data from './data';
import { Database } from "../common/database/Database";
import {LoginResponseData} from "../login/login.dto";
import {RefreshTokenResponseData} from 'security/refresh-token/refresh-token.dto';
import {generateUUID} from "../common/validation/uuid";

dotenv.config();

const database = Database.get();
type AxiosError = { response: AxiosResponse<never>};

const BaseURL = `http://localhost:${process.env.EXPRESS_PORT}/api`;

const { TEST_USER_1, TEST_USER_2, TEST_USER_3, TEST_USER_4, TEST_USER_5 } = data;
function delay(time: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, time));
}
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

async function securityMiddleware() :Promise<void> {
    try {
        const { status } = await http.get(BaseURL + '/me');
        assert.notStrictEqual(status, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.UNAUTHORIZED);
    }
    try {
        const { status } = await http.get(BaseURL + '/me', {    headers: { Authorization: `Bearer 123` } });
        assert.notStrictEqual(status, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.UNAUTHORIZED);
    }
}
async function loggedUserFetchSecured() :Promise<void> {
    const { status: loginStatus, data } : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_1);
    assert.strictEqual(loginStatus, Status.OK);

    const { status } = await http.get(BaseURL + '/me', {    headers: { Authorization: `Bearer ${data.accessToken}` } });
    assert.strictEqual(status, Status.OK);
}
async function testingTokenRefreshing() :Promise<void> {
    const { status: loginStatus, data } : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_1);
    assert.strictEqual(loginStatus, Status.OK);

    const { status } = await http.get(BaseURL + '/me', {    headers: { Authorization: `Bearer ${data.accessToken}` } });
    assert.strictEqual(status, Status.OK);

    await delay(1100);

    try {
        const { status } = await http.get(BaseURL + '/me', {    headers: { Authorization: `Bearer ${data.accessToken}` } });
        assert.notStrictEqual(status, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        if(!response) {
            throw error;
        }
        assert.strictEqual(response.status, Status.UNAUTHORIZED);
    }
    const { status: refreshingStatus, data: refreshingData } : {status: Status, data: RefreshTokenResponseData } = await http.post(BaseURL + '/token', { token: data.refreshToken });
    assert.strictEqual(refreshingStatus, Status.OK);

    const { status: meFetchingStatus } = await http.get(BaseURL + '/me', {    headers: { Authorization: `Bearer ${refreshingData.accessToken}` } });
    assert.strictEqual(meFetchingStatus, Status.OK);

}

async function updatePassword() :Promise<void> {
    const newPassword = 'password1';
    const { status: loginStatus, data } : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_1);
    assert.strictEqual(loginStatus, Status.OK);

    const token = data.accessToken;

    const { status: passwordUpdateStatus  } : { status:Status, data: LoginResponseData} =
        await http.post(BaseURL + '/me/update-password',
            { password: newPassword },
            {    headers: { Authorization: `Bearer ${token}` } });
    assert.strictEqual(passwordUpdateStatus, Status.OK);

    const { status: newloginStatus } : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', { email: TEST_USER_1.email, password: newPassword });
    assert.strictEqual(newloginStatus, Status.OK);
}

async function selfLike() :Promise<void> {
    const { status: loginStatus, data } : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_2);
    assert.strictEqual(loginStatus, Status.OK);

    const token = data.accessToken;
    try {
        const { status: passwordUpdateStatus  } : { status:Status, data: LoginResponseData} =
            await http.post(BaseURL + `/user/${data.user.id}/like`,
                { },
                {    headers: { Authorization: `Bearer ${token}` } });
        assert.notStrictEqual(passwordUpdateStatus, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.BAD_REQUEST);
    }
}
async function like() :Promise<void> {
    const { status: loginStatus, data: loginData1} : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_2);
    assert.strictEqual(loginStatus, Status.OK);

    const { status: loginStatus2, data: loginData2 } : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_3);
    assert.strictEqual(loginStatus2, Status.OK);

    const id = loginData1.user.id;
    const token = loginData2.accessToken;

    const { status: likeStatus  } : { status:Status, data: LoginResponseData} =
        await http.post(BaseURL + `/user/${id}/like`,
            { },
            {    headers: { Authorization: `Bearer ${token}` } });
    assert.strictEqual(likeStatus, Status.OK);

}

async function likeTwice() :Promise<void> {
    const { status: loginStatus, data: loginData1} : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_2);
    assert.strictEqual(loginStatus, Status.OK);

    const { status: loginStatus2, data: loginData2 } : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_3);
    assert.strictEqual(loginStatus2, Status.OK);

    const id = loginData1.user.id;
    const token = loginData2.accessToken;

    try {
        const { status: likeStatus  } : { status:Status, data: LoginResponseData} =
            await http.post(BaseURL + `/user/${id}/like`,
                { },
                {    headers: { Authorization: `Bearer ${token}` } });
        assert.notStrictEqual(likeStatus, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.CONFLICT);
    }
}

async function likeUnknown() :Promise<void> {
    const { status: loginStatus, data: loginData} : { status:Status, data: LoginResponseData} = await http.post(BaseURL + '/login', TEST_USER_2);
    assert.strictEqual(loginStatus, Status.OK);

    const id = generateUUID();
    const token = loginData.accessToken;

    try {
        const { status: likeStatus  } : { status:Status, data: LoginResponseData} =
            await http.post(BaseURL + `/user/${id}/like`,
                { },
                {    headers: { Authorization: `Bearer ${token}` } });
        assert.notStrictEqual(likeStatus, Status.OK);
    } catch(error) {
        const { response } = error as AxiosError;

        assert.strictEqual(response.status, Status.NOT_FOUND);
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
    it('Security middleware should prevent unsecured access to secured route', securityMiddleware);
    it('Logged in user can access to secured route', loggedUserFetchSecured);
    it('User should be able to refresh token after it is expired', testingTokenRefreshing);
    it('User should be able to update their password, and login with new password', updatePassword);
    it('User should not be able to like themself', selfLike);
    it('User should be able to like another user', like);
    it('User cannot like same user twice', likeTwice);
    it('User cannot like user that does not exist', likeUnknown);
});
