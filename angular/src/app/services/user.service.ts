import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    //baseUrl = 'http://localhost:3000';
    baseUrl = 'https://studenti.sum.ba/ifuaskme';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.baseUrl}/users/` + id);
    }

    checkUsername({username}: any) {
        return this.http.post(`${this.baseUrl}/users/check`, {username});
    }

    register(user: User) {
        return this.http.post(`${this.baseUrl}/users/register`, user);
    }

    login(username: string, password: string) {
        return this.http.post(`${this.baseUrl}/users/login`, {username, password});
    }

    update(user: User) {
        return this.http.put(`${this.baseUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseUrl}/users/` + id);
    }
}