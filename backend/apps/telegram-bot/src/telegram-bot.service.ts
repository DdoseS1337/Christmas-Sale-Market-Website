import { ConfigService } from '@nestjs/config';
import { Start, Ctx, Update, On, Message } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { AUTH_SERVICE, TelegramOrderDto, UserDto } from '@app/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';
import axios from 'axios';

@Update()
export class TelegramBotService extends Telegraf<Context> {
  constructor(
    private readonly configService: ConfigService,
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy,
  ) {
    super(configService.get('TELEGRAM_BOT_TOKEN'));
  }
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(`<b>Hello baby, ${ctx.from.username}</b>
      You gona get info soon
        `);
  }

  @On('text')
  onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    ctx.replyWithHTML(`<b>i get, ${message}</b>
      You gona get info soon
        `);
  }

  async setWebhook(webhookUrl: string) {
    try {
      return axios.get(
        `https://api.telegram.org/bot${this.configService.get(
          'TELEGRAM_BOT_TOKEN',
        )}/setWebhook?url=${webhookUrl}`,
      );
    } catch (error) {
      throw new error();
    }
  }

  async onOrder(data: TelegramOrderDto) {
    const productsDataArray = data.products;
    const productsMessage = productsDataArray
      .map(
        (product) =>
          `<b>${product.name}</b>\nID: ${product.id}\nPrice: ${product.price} ₴`,
      )
      .join('\n\n');

    const totalAmount = productsDataArray.reduce((total, product) => {
      return total + parseFloat(product.price);
    }, 0);

    const userInfo = `
    Name: ${data.first_name}
    Second name: ${data.second_name}
    Email: ${data.email || 'not provided'}
    City: ${data.city}
    Nova Poshta: ${data.Branch_nova_poshta}
    Phone number: ${data.phone_number}
    Additional info: ${data.additional_info || 'not provided'}
    `;

    const message = `
    <b>New order:</b>

    ${userInfo}

    <b>Order:</b>

    ${productsMessage}

    <b>Total Amount:</b> ${totalAmount} ₴
    `;
    let admins = [596621527]
    for (const admin of admins) {
      this.telegram.sendMessage(admin, message, {
        parse_mode: 'HTML',
      });
    }
    return "yes" 

    // return this.authService
    //   .send('get-admins', {})
    //   .pipe(
    //     tap((adminsResponse: UserDto[]) => {
    //       adminsResponse
    //         .filter((admin) => admin.telegramChatId)
    //         .map((admin) => {
    //           this.telegram.sendMessage(admin.telegramChatId, message, {
    //             parse_mode: 'HTML',
    //           });
    //         });
    //     }),
    //   )
    //   .subscribe();
  }
}
