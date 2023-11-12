import { CartItem } from "../services/basketService";

interface ItemCardProps {
    item: CartItem;
    onItemRemoved: (itemId: string) => void;
    onAmountChanged: (newAmount: number) => void;
}

export default ItemCardProps;