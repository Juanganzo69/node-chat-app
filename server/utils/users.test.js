const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Juan',
            room:'Node Course'
        },
        {   
            id: '2',
            name: 'Pedro',
            room:'Angular Course'
        },
        {
            id: '3',
            name: 'Jen',
            room:'Node Course'
        }];
    });

    it('Deberá añadir un nuevo user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Juan de Dios',
            room: 'Club de programación'
        };
        var resUser = users.addUsers(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Deberá remover un user', () => {
        var id = '1';
        var user = users.removeUser(id);

        expect(user.id).toBe(id);
        expect(users.users.length).toBe(2);
    });

    it('No deberá remover un user', () => {
        var id = '99';
        var user = users.removeUser(id);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('Deberá encontrar un user', () => {
        var id = '1';
        var user = users.getUser(id);

        expect(user.id).toBe(id);
    });

    it('No deberá encontrar un user', () => {
        var id = '99';
        var user = users.getUser(id);

        expect(user).toNotExist();
    });

    it('Deberá retornar los nombres del curso de Node Couser', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Juan', 'Jen']);
    });

    it('Deberá retornar los nombres del curso de Angular Couser', () => {
        var userList = users.getUserList('Angular Course');
        expect(userList).toEqual(['Pedro']);
    });
});