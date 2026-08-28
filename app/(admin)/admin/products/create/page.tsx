import ProductForm from '@/components/admin/products/ProductForm';
import { getCategories } from '@/lib/actions/category.actions';
import { getGuides } from '@/lib/actions/guide.actions';

export default async function CreateProductPage() {
  const categoriesRes = await getCategories();
  const categories = categoriesRes.success && categoriesRes.data 
    ? categoriesRes.data.map((c: any) => ({ label: c.name, value: c._id }))
    : [];

  const guidesRes = await getGuides();
  const guides = guidesRes.success && guidesRes.data
    ? guidesRes.data.map((g: any) => ({ label: g.title, value: g._id }))
    : [];

  return <ProductForm categories={categories} guides={guides} />;
}
