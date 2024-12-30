import React from 'react';
import CreateProductForm from '@/components/create-product-test';
import { fetchDataCreateProductForm } from '@/data/fetch-data';

export default async function AnalyticsPage() {
    const data = await fetchDataCreateProductForm();

    return <CreateProductForm dataCreateProduct={data} />;
}
