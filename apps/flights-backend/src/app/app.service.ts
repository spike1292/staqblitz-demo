import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return [
      { date: '2022-03-04', departure: '13:00', arrival: '17:00', price: 500 },
      { date: '2022-03-04', departure: '15:00', arrival: '19:00', price: 550 },
    ];
  }
}
