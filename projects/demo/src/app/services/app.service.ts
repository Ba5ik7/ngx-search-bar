import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  httpClient = inject(HttpClient);

  usersResponse = new BehaviorSubject<unknown>(null);
  usersResponse$ = this.usersResponse.asObservable();

  fetchUsers() {
    return this.httpClient.get<unknown>('https://dummyjson.com/users').pipe(
      tap((response) => this.usersResponse.next(response))
    );
  }
}
