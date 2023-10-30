import { ConfigService } from '@nestjs/config';
import { Start, Ctx, Update, On, Message } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { TelegramOrderDto } from '@app/common';
import { BadRequestException, Inject } from '@nestjs/common';

@Update()
export class TelegramBotService extends Telegraf<Context> {
  constructor(private readonly configService: ConfigService) {
    super(configService.get('TELEGRAM_BOT_TOKEN'));
  }
  @Start()
  onStart(@Ctx() ctx: Context) {
    try {
      ctx.replyWithHTML(`<b>Hello baby, ${ctx.from.username}</b>
      You gona get info soon
        `);
    } catch (error) {
      throw new BadRequestException('smth bad happend');
    }
  }

  @On('text')
  onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    try {
      ctx.replyWithHTML(`<b>i get, ${message}</b>
      You gona get info soon
        `);
    } catch (error) {
      throw new BadRequestException('smth bad happend');
    }
  }

  async onOrder(data: TelegramOrderDto) {
    const admins = [596621527];
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
    for (const adminChatId of admins) {
      this.telegram.sendMessage(adminChatId, message, {
        parse_mode: 'HTML',
      });
    }
  }
}
