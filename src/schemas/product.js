export const typeDef = `

type Product {
    id: ID!
    product_price: Int
    product_slug: String
    product_status: String
    product_tax: Int
    product_type: String
    product_sku: String
    product_min_order: Int
    product_max_order: Int
    product_discount_price: Int
    product_video_url: String
    product_view: String
    product_weight: String
    product_gallary_detail: [productGallaryDetail!]
    product_id: String
    product_unit: Units!
    product_user: ProductUser!
    product_brand: [ProductBrand]!
    stock: Stock!
    product_category: [Category]
    category: Category
    product_gallary: Gallary!
    detail: [Detail!]
    attribute: [Attribute]
    product_combination: [ProductCombination]
    countries: [Country]!
  }
  type ProductBrand {
    id: ID!
    name: String
    brand_slug: String
    status: String
    gallary: Gallary
  }
  type GallaryDetail {
    id: ID!
    user_id: User!
    path: String
    gallary_type: String
  }
  type productGallaryDetail {
    id: ID!
    product_id: Int
    gallary_id: Int
    created_at: String
    updated_at: String
  }
  type ProductUser {
    u_id: ID!
    name: String
    email: String
    status: String
    role: Role!
  }
  type Role{
    id: ID!
    name: String
  }
  type Stock{
    discount_price: Int
    price: Int
    product_combination_id: Int
    product_type: String
    remaining_stock: String
    stock_in: String
    stock_out: String
    warehouse_id: Int
  }
  type Gallary {
    id: ID!
    created_at: String
    created_by: Int
    deleted_at: String
    extension: String
    name: String
    updated_at: String
    updated_by: Int
    detail: [GallaryDetail]
  }
  type Category {
    id: ID!
    parent_id: Int 
    category_slug: String
    category_detail: [CategoryDetail]
  }
  type CategoryDetail {
    id: ID!
    category_name: String
    description: String
    category_id: Int
    language_id: String
  }
  type Detail {
    is_featured: Int
    is_points: String
  }
  type ProductCategory {
    id: ID
    product_id: Int
    category_id: Int
  }
  type Units {
    id: ID!
    is_active: Int
    created_by: Int
    updated_by: Int
    deleted_at: String
    created_at: String
    updated_at: String
  }
  type Attribute {
    id: ID
    name: String
    product_id: Int
    created_by: Int
    updated_by: Int
    attributes: Attributes
    variations: [Variation]!
  }
  type Attributes {
    id: ID!
    attribute_id: Int
    detail: [AttributeDetail]
  }
  type AttributeDetail {
    id: ID!
    attribute_id: Int
    language_id: Int
    name: String
  }
  type Variation {
    product_variation: ProductVariation
  }
  type ProductVariation {
    id: ID!
    detail: [VariationDetail]!
  }
  type VariationDetail {
    id: ID!
    name: String
    variation_id: Int
    language_id: Int
    language: Language
  }
  type Language {
    id: ID!
    name: String
    code: String
    directory: String
    is_default: Int
    direction: String
    created_by: Int
    updated_by: Int
    deleted_at: String
    created_at: String
    updated_at: String
  }
  
  type ProductCombination { 
    id: ID!
    product_id: Int
    sku: String
    price: String
    available_qty: String
    gallary_id: Int
    gallary: Gallary
    combination: [ProductCombinationDetail]
  }
  type ProductCombinationDetail {
    id: ID!
    variation_id: Int
    product_id: Int
    product_combination_id: Int
  }


`;


