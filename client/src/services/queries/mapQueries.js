import glutenCeroApi from '../glutenCeroApi';

export const getAddressesOfPlaces = async (search, signal) => {
	//const filterUrl = filterKey ? `category=${filterKey}` : '';
	if (!search) return;

	//const { data } = await glutenCeroApi.get(`/products?${filterUrl}`);
  const data = fetch(`https://jsonplaceholder.typicode.com/todos?q=${search}`, {
		signal,
  }).then((res) => res.json())
	return data;
};

export const sleep = (seconds = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};
