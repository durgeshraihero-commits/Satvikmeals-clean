async function payNow(planId) {
  const res = await fetch("/api/instamojo/subscription", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  window.location.href = data.url;
}
