import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OAuth2Client } from 'google-auth-library';

@Controller()
export class AppController {
  private readonly client : OAuth2Client
  constructor(private readonly appService: AppService) {
   this.client=new OAuth2Client();
  }
  private async verify(token:string):Promise<any>
{
  const ticket = await this.client.verifyIdToken({
    idToken:token,
    audience:'851845998755-fsqhsq70hk3e1polocee8hqvf1arfor6.apps.googleusercontent.com'
  });
  const payload = ticket.getPayload();
  console.log('Payload Data --> ', payload);
  return payload 
  
}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/google-sigin')
  async decode(@Body() body:{token:any}):Promise<any>{
    const payload = await this.verify(body.token).catch(console.error);
    return payload?payload:'Error'
  }
}
