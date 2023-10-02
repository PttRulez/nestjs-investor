import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoexApi {
  private baseUrl = 'https://iss.moex.com/iss';
  constructor(private http: HttpService) {}

  async getSecurityByTicker(ticker: string) {
    const moexSecurityUrl = `${this.baseUrl}/securities/${ticker}.json`;
    console.log('moexSecurityUrl', moexSecurityUrl);
    const response = await firstValueFrom(
      this.http.get(moexSecurityUrl, {
        params: {
          'iss.meta': 'off',
          // 'description.columns': 'ssecid,name,shortname,type',
          'boards.columns': 'secid,boardid,market,engine',
        },
      }),
    );
    console.log('response', response.data);
  }
}
