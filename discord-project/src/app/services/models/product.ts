export class Product {
    id: string;
  name: string;
  price: number;
  description: string;
  tags: any[];
  picture: string;
  isActive: boolean;
  readonly createdDate?: string;
  readonly updatedDate?: string;

  constructor() {
    this.id = "";
    this.name = "";
    this.price = 0;
    this.description = "";
    this.tags = [];
    this.picture = "";
    this.isActive = false;
  }
}
