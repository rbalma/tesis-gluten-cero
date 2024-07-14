import { Form, Input, Select } from 'antd';
import { SearchIcon } from '../Icons';
import { useGetTypesProducts } from '@/services/queries/productsQueries';
import styles from './FiltersProducts.module.css';

export const SearchBarProducts = () => {
  const { isLoading: isLoadingTypesProducts, data: dataTypesProducts = [] } =
  useGetTypesProducts();

  return (
    <div className={styles.mainSearchInput}>
    <div className={styles.searchInputName}>
      <Form.Item name='name' noStyle>
        <Input
          bordered={false}
          placeholder='¿Qué producto estás buscando?'
        />
      </Form.Item>
    </div>
    <div className={styles.searchInputProductType}>
      <Form.Item name='type' noStyle>
        <Select
          bordered={false}
          allowClear
          className={styles.searchSelect}
          loading={isLoadingTypesProducts}
          placeholder='Tipo de producto'
          options={dataTypesProducts}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '')
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        />
      </Form.Item>
    </div>
    <div className={styles.searchInputBrand}>
      <Form.Item name='brand' noStyle>
        <Input bordered={false} placeholder='Todas las marcas' />
      </Form.Item>
    </div>
    <button type='submit' className={styles.btnSearch}>
      <SearchIcon />
    </button>
  </div>
  )
}
