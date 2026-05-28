import { useState } from "react";

function Products({ cartItems, setCartItems, setPage }) {
  const [selectedCategory, setSelectedCategory] = useState("Appliances");
  const [search, setSearch] = useState("");

  const products = {
    Appliances: [
      {
        id: 101,
        name: "Fridge",
        priceNumber: 18,
        info: "Large fridge suitable for family use.",
        img: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 102,
        name: "Washing Machine",
        priceNumber: 16,
        info: "Reliable washing machine for weekly rental.",
        img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 103,
        name: "Microwave",
        priceNumber: 8,
        info: "Compact microwave for kitchen use.",
        img: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80",
      },
    ],

    Furniture: [
      {
        id: 201,
        name: "Dining Table",
        priceNumber: 19,
        info: "7 piece dining table and chairs.",
        img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 202,
        name: "Office Desk",
        priceNumber: 12,
        info: "Simple office desk for home study or work.",
        img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 203,
        name: "Sofa",
        priceNumber: 20,
        info: "Comfortable sofa for living room use.",
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      },
    ],

    Fitness: [
      {
        id: 301,
        name: "Exercise Bike",
        priceNumber: 14,
        info: "Adjustable bike for home fitness.",
        img: "https://images.unsplash.com/photo-1591741547934-8d7c16ff8e3b?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 302,
        name: "Treadmill",
        priceNumber: 22,
        info: "Treadmill with speed control.",
        img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 303,
        name: "Rower",
        priceNumber: 15,
        info: "Rowing machine for cardio training.",
        img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80",
      },
    ],

    Electronics: [
      {
        id: 401,
        name: "Television",
        priceNumber: 20,
        info: "Smart TV for home entertainment.",
        img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 402,
        name: "Speaker System",
        priceNumber: 10,
        info: "Audio system for home use.",
        img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 403,
        name: "Laptop",
        priceNumber: 25,
        info: "Laptop suitable for study and office work.",
        img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
      },
    ],
  };

  const allProducts = Object.values(products).flat();

  const filteredProducts = search.trim()
    ? allProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : products[selectedCategory];

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    setPage("cart");
  };

  return (
    <>
      <section className="shop-banner">
        <h1>Our Products</h1>
      </section>

      <section className="products-page">
        <div className="search-box-area">
          <h1>Find Your Rental Product</h1>

          <input
            placeholder="Search for fridge, sofa, treadmill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-tabs">
          {Object.keys(products).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSearch("");
              }}
              className={selectedCategory === category ? "active-category" : ""}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="products-list">
          {filteredProducts.length === 0 ? (
            <div className="product-card">
              <h2>No product found</h2>
              <p>Try searching another product name.</p>
            </div>
          ) : (
            filteredProducts.map((item) => (
              <div className="product-card" key={item.id}>
                <img src={item.img} alt={item.name} />

                <h2>{item.name}</h2>

                <h3>
                  ${item.priceNumber.toFixed(2)}
                  <span> per week *</span>
                </h3>

                <p>{item.info}</p>

                <button onClick={() => addToCart(item)}>ADD TO CART</button>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default Products;