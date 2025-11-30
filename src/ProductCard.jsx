 const ProductCard = ({ product, onSelect }) => (
  <li className="product">
    <img src={product.image} alt={product.title} width="150" />
    <h2 onClick={() => onSelect()}>{product.title}</h2>
    <p>{product.category}</p>
    <p>${product.price.toFixed(2)}</p>
  </li>
);

export default ProductCard;
