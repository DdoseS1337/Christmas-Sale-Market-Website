import { ConfigService } from '@nestjs/config';
import { Start, Ctx, Update, On, Message } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import axios from 'axios';
import { AUTH_SERVICE_URL, TelegramOrderDto, UserDto } from '@app/common';


@Update()
export class TelegramBotService extends Telegraf<Context> {
  constructor(
    private readonly configService: ConfigService,
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
          `<b>${product.name}</b>\n  ID: ${product.id}\n  Price per one: ${product.price}₴\n  Quantity ${product.quantity} Total Amount for product ${product.price * product.quantity}`,
      )
      .join('\n\n');

    const totalAmount = productsDataArray.reduce((total, product) => {
      return total + (product.price * product.quantity) ;
    }, 0);

    const userInfo = `
    Name: ${data.first_name}
    Second name: ${data.second_name}
    Email: ${data.email || 'not provided'}
    City: ${data.city}
    Nova Poshta: ${data.branch_nova_poshta}
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
    return axios.get(`${AUTH_SERVICE_URL.DEV}/get-admins`)
    .then((response) => {
      const adminsResponse: UserDto[] = response.data;
  
      adminsResponse
        .filter((admin) => admin.telegramChatId)
        .forEach((admin) => {
          this.telegram.sendMessage(admin.telegramChatId, message, {
            parse_mode: 'HTML',
          });
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}
