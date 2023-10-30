export interface CartItem {
    id: string;
    name: string;
    newPrice: number;
    picture: string[];
    amount: number;
}

export class CartService {
    private static cart: CartItem[] = [];

    // Отримання корзини з Local Storage з перевірками
    static loadCart(): void {
        let cartData = [];
        if (localStorage.christmasMarketBasket) {
            cartData = JSON.parse(
                localStorage.getItem("christmasMarketBasket") || "[]"
            );
        } else {
            localStorage.setItem("christmasMarketBasket", "");
        }

        this.cart = cartData.filter(this.isValidCartItem);
    }

    // Збереження корзини в Local Storage з опціональним списком товарів
    static saveCart(updatedCart?: CartItem[]): void {
        const cartToSave = updatedCart || this.cart;
        const validCart = cartToSave.filter(this.isValidCartItem);
        localStorage.setItem(
            "christmasMarketBasket",
            JSON.stringify(validCart)
        );
    }

    // Додавання товару до корзини
    static addToCart(item: CartItem): void {
        const existingItem = this.cart.find(
            (cartItem) => cartItem.id === item.id
        );
        if (existingItem) {
            existingItem.amount += 1;
        } else {
            item.amount = 1;
            this.cart.push(item);
        }
        this.saveCart();
    }

    // Видалення товару з корзини
    static removeFromCart(itemId: string): void {
        const index = this.cart.findIndex((item) => item.id === itemId);
        if (index !== -1) {
            const item = this.cart[index];
            if (item.amount > 1) {
                item.amount -= 1;
            } else {
                this.cart.splice(index, 1);
            }
            this.saveCart();
        }
    }

    // Отримання суми товарів в кошику
    static getTotalPrice(): number {
        return this.cart.reduce(
            (total, item) => total + item.newPrice * item.amount,
            0
        );
    }

    // Перевірка, чи товар відповідає очікуваному формату
    private static isValidCartItem(item: CartItem): boolean {
        const { id: id, name, newPrice, picture, amount } = item;
        return (
            !!id &&
            !!name &&
            !!newPrice &&
            Array.isArray(picture) &&
            picture.length > 0 &&
            amount >= 1
        );
    }

    // Отримати список товарів з Local Storage
    static getCart(): CartItem[] {
        this.loadCart(); // Завантажимо дані з Local Storage
        return this.cart;
    }

    // Оновлення товару за його id та новими даними
    static updateCartItem(
        itemId: string,
        updatedData: Partial<CartItem>
    ): void {
        const cart = this.getCart();
        const updatedCart = cart.map((item) => {
            if (item.id === itemId) {
                return { ...item, ...updatedData };
            }
            return item;
        });
        this.saveCart(updatedCart);
    }
}
