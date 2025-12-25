async function pay(planId) {
  const res = await fetch("/api/instamojo/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url; // ✅ Redirects to Instamojo
  } else {
    alert("Payment failed");
  }
}
<button onClick={() => pay("tea")}>Pay Now</button>
<button onClick={() => pay("meal")}>Pay Now</button>
<button onClick={() => pay("month1")}>Pay Now</button>
<button onClick={() => pay("month2")}>Pay Now</button>
