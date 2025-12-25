await fetch("/api/cart", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: userEmail,          // 👈 REQUIRED
    itemId: item._id,          // 👈 UNIQUE
    name: item.name,
    price: item.price,
    image: item.image
  })
});
