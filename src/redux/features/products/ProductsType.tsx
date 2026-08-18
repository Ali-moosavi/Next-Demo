export type ProductProperty = {
  id: number;
  propertyId: number;
  name: string;
  nameFa: string;
  displayType: 'color' | 'text';
  value: string;
  valueFa: string;
  metadata?: {
    hex?: string;
  };
};

export type ProductColor = {
  name: string;
  hex: string;
  selected?: boolean;
};

export type ProductDetailItem = {
  label: string;
  value: string;
};

export type ProductSeller = {
  name: string;
  satisfactionRate: string;
  performance: string;
  warranty: string;
  inventoryStatus: string;
  shippingMethods: string[];
  otherSellerCount: number;
  remainingStock: number;
  clubPoints: number;
};

export type ProductReview = {
  id: number;
  recommendation: string;
  text: string;
  author: string;
  isBuyer: boolean;
  helpfulCount: number;
};

export type ProductQuestion = {
  id: number;
  text: string;
  answerCount: number;
};

export type ProductPageDetails = {
  brandName: string;
  productGroup: string;
  ratingCount: number;
  commentCount: number;
  questionCount: number;
  colors: ProductColor[];
  featureHighlights: ProductDetailItem[];
  seller: ProductSeller;
  currency: string;
  returnPolicy: string;
  introduction: string;
  expertReviewImage?: string;
  expertReviewText?: string;
  specifications: ProductDetailItem[];
  reviews: ProductReview[];
  questions: ProductQuestion[];
};

export type Product = {
  id: number;
  name: string;
  describtion: string;
  Categoryid: number;
  price: string;
  rate: string;
  image: string[];
  badge?: string;
  properties?: ProductProperty[];
  propertyValueIds?: number[];
  propertyIds?: number[];
  pageDetails?: ProductPageDetails;
};

export type PropertyValue = {
  id: number;
  propertyId: number;
  name: string;
  nameFa: string;
  metadata?: {
    hex?: string;
  };
  productCount?: number;
};

export type ProductPropertyGroup = {
  id: number;
  name: string;
  nameFa: string;
  displayType: 'color' | 'text';
  values?: PropertyValue[];
};

export type ProductCategoryChild = {
  name: string;
  parentcategoryid: number;
  id: number;
  children: ProductCategoryChild[];
  products?: Product[];
};

export type ProductCategory = {
  name: string;
  categoryid: number;
  children: ProductCategoryChild[];
};

export type SUCCES_PRODUCTS_TYPE = ProductCategory[];

export type INITIALSTATES = {
  products: SUCCES_PRODUCTS_TYPE;
  filteredItems:number[]
};
