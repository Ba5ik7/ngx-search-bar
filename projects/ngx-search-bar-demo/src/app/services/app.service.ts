import { HttpClient } from '@angular/common/http';
import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { CurrentTextValue } from 'ngx-search-bar';
import { BehaviorSubject, filter, map, tap } from 'rxjs';

interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  httpClient = inject(HttpClient);

  outlineToggle = signal(false);
  outline = linkedSignal({
    source: this.outlineToggle,
    computation: (value) => value ? 'outline' : 'fill'
  });
  
  outlinedToggle = signal(false);
  outlined = linkedSignal({
    source: this.outlinedToggle,
    computation: (value) => value ? 'outlined' : 'raised'
  });
  
  gridToggle = signal(false);
  grid = linkedSignal({
    source: this.gridToggle,
    computation: (value) => value ? 'grid' : 'list'
  });

  usersResponse = new BehaviorSubject<UsersResponse | null>(null);
  usersResponse$ = this.usersResponse.asObservable();

  fetchUsers() {
    return this.httpClient.get<UsersResponse>('https://dummyjson.com/users').pipe(
      tap((response) => this.usersResponse.next(response))
    );
  }

  filterUser(filter: CurrentTextValue) {
    return (
      this.httpClient
        .get<UsersResponse>(`https://dummyjson.com/users/search?q=${filter}`)
        .pipe(tap((response) => this.usersResponse.next(response)))
    );
  }

  marshalledUsersInToSearchResults$ = this.usersResponse$.pipe(
    filter((response) => response !== null),
    map((response) => this.marshallUsersInToResults(response))
  );

  marshallUsersInToResults({ users }: UsersResponse) {
    return users.map((user) => ({
      title: user.firstName + ' ' + user.lastName,
      description: `${user.email} ${user.phone}`,
      image: user.image,
    }));
  }
}
