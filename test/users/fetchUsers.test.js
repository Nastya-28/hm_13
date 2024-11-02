import { expect } from 'chai';
import sinon from 'sinon';
import { fetchUsers } from '../../src/users.js';

describe('Проверка работы функции fetchUsers', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('Функция должна полкчать и выводить имя пользователя', async () => {
        const testUsers = [
            { id: 1, name: 'Bob' },
            { id: 2, name: 'Jane' }
        ]

        global.fetch - sandbox.stub().resolves({
            ok: true,
            json: async () => testUsers
        })


        const consoleLogSpy = sandbox.spy(console, 'log');

        await fetchUsers();

        expect(global.fetch.calledOnce).to.be.true;
        expect(global.fetch.calledWith('https://jsonplaceholder.typicode.com/users')).to.be.true;
        expect(consoleLogSpy.calledWith('Bob')).to.be.true;
        expect(consoleLogSpy.calledWith('Jane')).to.be.true;

    });

    it('Функция должна обрабатывать ошибки при запросе', async () => {
        global.fetch = sandbox.stub().resolves({
            ok: false,
            status: 404
        });

        try {
            await fetchUsers();
            expect.fail('Функция должна была выдать ошибку');
        } catch {
            expect(error.message).to.include('HTTP error! status: 404');
        }
    });
})