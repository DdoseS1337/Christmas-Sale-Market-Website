interface Currency {
    id: string;
    rate: string;
  }
  
interface Category {
    _: string;
    id: string;
    parentId?: string;
  }
  